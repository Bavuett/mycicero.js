import fetch from 'node-fetch';
import { GetNearestStopsSettings, GetSolutionsParams, GetSolutionsSettings, Headers, Location, Locations, NearestStopsFetchParams } from './Types/MyCicero';
import Solutions, { Route, Solution } from './Types/Solutions';
import SolutionsResult from './Types/SolutionsResult';
import Stops from './Types/Stops';
import StopsResult from './Types/StopsResult';
import getMeansOfTransport from './Utils/getMeansOfTransport';
import getUnixDate from './Utils/getUnixDate';

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
     * @returns {Solutions} Solutions object.
    */
    async getSolutions(settings: GetSolutionsSettings): Promise<Solutions | void> {
        // Make sure all the data necessary for the request is available.
        if (!settings.locations.departure || !settings.locations.arrival) {
            throw new Error('Missing departure or arrival location.');
        }

        if (!settings.dates.departure) {
            throw new Error('Missing departure date.');
        }

        // Organize params as required by the API.
        const requestParams: GetSolutionsParams = {
            locations: {
                departure: {
                    lat: Math.round(settings.locations.departure.lat * 1000000) / 1000000,
                    lon: Math.round(settings.locations.departure.lon * 1000000) / 1000000
                },
                arrival: {
                    lat: Math.round(settings.locations.arrival.lat * 1000000) / 1000000,
                    lon: Math.round(settings.locations.arrival.lon * 1000000) / 1000000
                }
            },
            dates: {
                departure: Math.floor(settings.dates.departure.getTime() / 1000),
                arrival: settings.dates.arrival ? Math.floor(settings.dates.arrival.getTime() / 1000) : undefined
            },
            passengers: {
                adults: settings.passengers?.adults ?? 1,
                children: settings.passengers?.children ?? 0
            }
        };

        const requestBody = {
            "Ambiente": {
                "Ambiti": [
                  1  
                ]
            },
            "NumeroAdulti": settings.passengers?.adults ?? 1,
            "NumeroRagazzi": settings.passengers?.children ?? 0,
            "FiltroModalita": [
                0,
                2,
                1,
                3,
                15
            ],
            "OraDa": `/Date(${requestParams.dates.departure}000+0200)/`,
            "OraA": requestParams.dates.arrival ? `/Date(${requestParams.dates.arrival}000+0200)/` : null,
            "ArrOraA": null,
            "ArrOraDa": null,
            "Ordinamento": {
                "Criterio": 0,
                "Direzione": 0
            },
            "ActivateRunsOnNextDay": true,
            "DataPartenza": `/Date(${requestParams.dates.departure}000+0200)/`,
            "PuntoOrigine": {
                "Formato": 0,
                "Lat": requestParams.locations.departure.lat,
                "Lng": requestParams.locations.departure.lon
            },
            "PuntoDestinazione": {
                "Formato": 0,
                "Lat": requestParams.locations.arrival.lat,
                "Lng": requestParams.locations.arrival.lon
            },
            "NumMaxSoluzioni": 8,
            "Intermodale": true,
            "ModalitaRicerca": 0,
            "TipoPercorso": 0,
            "MaxDistanzaAPiedi": null
        };

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
        
        data.Oggetti.map((item) => {
            let solution: Solution = {
                departure: item.DataOraPartenza,
                arrival: item.DataOraArrivo,
                minutes: {
                    total: item.MinutiTotali,
                    onFoot: item.MinutiPiedi,
                    onVehicle: item.MinutiBordo,
                },
                meters: {
                    total: item.MetriTotali,
                    onFoot: item.MetriPiedi,
                    onVehicle: item.MetriBordo,
                },
                co2Emission: item.EmissioneCO2,
                price: item.PrezzoSoluzione ?? 'Not available',
                type: item.TipoSoluzione,
                routes: [],
            };

            item.Tratte.map((item) => {
                let route: Route = {
                    line: {
                        description: item.Linea.Descrizione,
                        lineNumber: item.Linea.CodiceInfoUtenza,
                        code: item.Linea.Codice,
                        type: getMeansOfTransport(item.Linea.ModalitaTrasporto),
                        company: {
                            name: item.Linea.Vettore,
                            logoUrl: item.Linea.LogoVettoreEsteso,
                            code: item.Linea.CodiceAzienda,
                        },
                        bookingNeeded: item.Linea.PrenotazioneObbligatoria ?? false,
                        extraurban: item.Linea.Extraurbano,
                    },
                    departure: {
                        description: item.LocalitaDiscesa.Descrizione,
                        location: {
                            lat: item.LocalitaSalita.Coordinate.Lat,
                            lon: item.LocalitaSalita.Coordinate.Lng,
                        }
                    },
                    arrival: {
                        description: item.LocalitaSalita.Descrizione,
                        location: {
                            lat: item.LocalitaDiscesa.Coordinate.Lat,
                            lon: item.LocalitaDiscesa.Coordinate.Lng,
                        }
                    }
                };

                solution.routes.push(route);
            });

            result.solutions.push(solution);
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
    async getNearestStops(settings: GetNearestStopsSettings): Promise<Stops | void> {
        // Make sure all the data necessary for the request is available.
        if (!settings.location.lat || !settings.location.lon) {
            throw new Error('Missing location.');
        }

        // Organize params as required by the API.
        const requestParams: NearestStopsFetchParams = {
            location: {
                lat: Math.round(settings.location.lat * 1000000) / 1000000,
                lon: Math.round(settings.location.lon * 1000000) / 1000000
            },
            radius: settings.radius ?? 500
        };

        const requestBody = {
            "Ambiente": {
                "Ambiti": [
                    0
                ]
            },
            "DevicePosition": {
                "Formato": 0,
                "Lat": requestParams.location.lat,
                "Lng": requestParams.location.lon
            },
            "DistanzaMetri": settings.radius ?? 500,
            "IdDevice": "DEBUG",
            "Punto": {
                "Formato": 0,
                "Lat": requestParams.location.lat,
                "Lng": requestParams.location.lon
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
        };

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