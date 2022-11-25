import fetch from 'node-fetch';
import { Dates, GetNearestStopsSettings, GetSolutionsSettings, Headers, Location, Locations, Passengers, UnixDates } from './Types/MyCicero';
import Solutions from './Types/Solutions';
import SolutionsResult from './Types/SolutionsResult';
import Stops from './Types/Stops';
import StopsResult from './Types/StopsResult';

export class MyCicero {
    private readonly baseUrl: string;
    private headers: Headers;

    constructor() {
        this.baseUrl = `https://www.mycicero.it/OTPProxy/host.ashx?url=momoservice/json`;

        this.headers = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.9,it-IT;q=0.8,it;q=0.7',
            'Client': 'tpwebportal;4.4.7',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Culture': 'it-IT',
            'Origin': 'https://www.mycicero.it',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        }
    }

    /** 
     * Searches for solutions
     * @param {GetSolutionsSettings} settings Settings for the request.
     * @param {Locations} settings.locations Locations of your trip.
     * @param {Location} settings.locations.departure Departure location.
     * @param {number} settings.locations.departure.lat Latitude of the departure location.
     * @param {number} settings.locations.departure.lon Longitude of the departure location.
     * @param {Location} settings.locations.arrival Arrival location.
     * @param {number} settings.locations.arrival.lat Latitude of the arrival location.
     * @param {number} settings.locations.arrival.lon Longitude of the arrival location.
     * @param {Dates} settings.dates Dates of your trip.
     * @param {Date} settings.dates.departure Departure date.
     * @param {Date} [settings.dates.arrival] Arrival date - optional.
     * @param {Passengers} [settings.passengers] Passengers of your trip - optional.
     * @param {number} settings.passengers.adults Number of adults.
     * @param {number} [settings.passengers.children] Number of children - optional.
     * @returns {Solutions} Solutions object
    */
    async getSolutions(settings: GetSolutionsSettings): Promise<Solutions | void> {
        // Make sure all the data necessary for the request is available. TODO: Improve this. Doesn't work in some cases.
        if (!settings.locations.departure || !settings.locations.arrival) {
            throw new Error('Missing departure or arrival location.');
        }

        if (!settings.dates.departure) {
            throw new Error('Missing departure date.');
        }

        // Make sure the locations are with six decimal places.
        const locationSettings: Locations = {
            departure: {
                lat: Math.round(settings.locations.departure.lat * 1000000) / 1000000,
                lon: Math.round(settings.locations.departure.lon * 1000000) / 1000000
            },
            arrival: {
                lat: Math.round(settings.locations.arrival.lat * 1000000) / 1000000,
                lon: Math.round(settings.locations.arrival.lon * 1000000) / 1000000
            }
        }

        // Convert dates to Unix timestamps because MyCicero only accepts them in this format.
        const datesSettings: UnixDates = {
            departure: Math.floor(settings.dates.departure.getTime() / 1000),
            arrival: settings.dates.arrival ? Math.floor(settings.dates.arrival.getTime() / 1000) : undefined
        }

        const requestBody = {
            "Ambiente": {
                "Ambiti": [
                    0
                ]
            },
            "NumeroAdulti": settings.passengers?.adults ?? 1,
            "NumeroRagazzi": settings.passengers?.children ?? 0,
            "FiltroModalita": [
                1,
                3,
                15
            ],
            "OraDa": `/Date(${datesSettings.departure}000+0200)/`,
            "OraA": datesSettings.arrival ? `/Date(${datesSettings.arrival}000+0200)/` : null,
            "ArrOraA": null,
            "ArrOraDa": null,
            "Ordinamento": {
                "Criterio": 0,
                "Direzione": 0
            },
            "ActivateRunsOnNextDay": true,
            "DataPartenza": `/Date(${datesSettings.departure}000+0200)/`,
            "PuntoOrigine": {
                "Formato": 0,
                "Lat": locationSettings.departure.lat,
                "Lng": locationSettings.departure.lon
            },
            "PuntoDestinazione": {
                "Formato": 0,
                "Lat": locationSettings.arrival.lat,
                "Lng": locationSettings.arrival.lon
            },
            "NumMaxSoluzioni": 8,
            "Intermodale": false,
            "ModalitaRicerca": 0,
            "TipoPercorso": 0,
            "MaxDistanzaAPiedi": null
        }

        const response = await fetch(`${this.baseUrl}/FindTPSolutions`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(requestBody),
        });

        if (response.status !== 200) {
            throw new Error(`Server responded with status code ${response.status}.`);
        }

        const data: SolutionsResult = await response.json().catch((err) => {
            throw new Error(`Error parsing JSON: ${err}`);
        });

        // TODO: Further improve formatting.
        let result: Solutions = {
            solutions: [],
        };
        
        data.Oggetti.map((item, index) => {
            result.solutions.push({
                price: item.PrezzoSoluzione,
                arrival: item.DataOraArrivo,
                departure: item.DataOraPartenza,
                minutes: {
                    total: item.MinutiTotali,
                    onFoot: item.MinutiPiedi,
                    onVehicle: item.MinutiBordo
                },
                meters: {
                    total: item.MetriTotali,
                    onFoot: item.MetriPiedi,
                    onVehicle: item.MetriBordo
                },
                co2Emission: item.EmissioneCO2,
                type: item.TipoSoluzione,
                routes: []
            });

            item.Tratte.map((route) => {
                result.solutions[index].routes.push({
                    line: {
                        description: route.Linea.Descrizione,
                        lineNumber: route.Linea.CodiceInfoUtenza,
                        company: {
                            code: route.Linea.CodiceAzienda,
                            name: route.Linea.Vettore,
                            logoUrl: route.Linea.LogoVettore
                        },
                        bookingNeeded: route.Linea.PrenotazioneObbligatoria,
                        type: route.Linea.TipoServizio,
                        extraurban: route.Linea.Extraurbano
                    },
                    departure: {
                        description: route.LocalitaSalita.Descrizione,
                        location: {
                            lat: route.LocalitaSalita.Coordinate.Lat,
                            lon: route.LocalitaSalita.Coordinate.Lng
                        },
                    },
                    arrival: {
                        description: route.LocalitaDiscesa.Descrizione,
                        location: {
                            lat: route.LocalitaDiscesa.Coordinate.Lat,
                            lon: route.LocalitaDiscesa.Coordinate.Lng
                        }
                    }
                });
            });
        });

        return result;
    }

    /**
     * Gets the nearest stops to a location
     * @param {GetNearestStopsSettings} settings Settings for the request.
     * @param {Location} settings.location Location to search for.
     * @param {number} settings.location.lat Latitude of the location.
     * @param {number} settings.location.lon Longitude of the location.
     * @param {number} [settings.radius] Radius in meters to search for stops - optional.
     * @returns {Stops} Stops object.
    */
    async getNearestStops(settings: GetNearestStopsSettings): Promise<Object | void> {
        // Make sure all the data necessary for the request is available.
        if (!settings.location.lat || !settings.location.lon) {
            throw new Error('Missing location.');
        }

        // Make sure the location is with six decimal places.
        const locationSettings: Location = {
            lat: Math.round(settings.location.lat * 1000000) / 1000000,
            lon: Math.round(settings.location.lon * 1000000) / 1000000
        }

        const requestBody = {
            "Ambiente": {
                "Ambiti": [
                    0
                ]
            },
            "DevicePosition": {
                "Formato": 0,
                "Lat": locationSettings.lat,
                "Lng": locationSettings.lon
            },
            "DistanzaMetri": settings.radius ?? 500,
            "IdDevice": "DEBUG",
            "Punto": {
                "Formato": 0,
                "Lat": locationSettings.lat,
                "Lng": locationSettings.lon
            },
        };

        const response = await fetch(`${this.baseUrl}/GetNearestStops`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(requestBody),
        });

        if (response.status !== 200) {
            throw new Error(`Server responded with status code ${response.status}.`);
        }

        const data: StopsResult = await response.json().catch((err) => {
            throw new Error(`Error parsing JSON: ${err}`);
        });

        let result: Stops = {
            stops: []
        }

        // TODO: Further improve formatting.
        data.Oggetti.map((item) => {
            result.stops.push({
                description: item.Descrizione,
                stopCode: item.CodiceInfoUtenza,
                company: item.CodAzienda,
                location: {
                    lat: item.Coordinate.Lat,
                    lon: item.Coordinate.Lng
                },
                city: item.Comune,
                distance: item.Distanza
            });
        });

        return result;
    }
}