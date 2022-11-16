import fetch from 'node-fetch';
import { Dates, Headers, Locations, Passengers, UnixDates } from './Types/MyCicero';
import Solutions from './Types/Solutions';

export class MyCicero {
    readonly baseUrl: string = `https://www.mycicero.it/OTPProxy/host.ashx?url=momoservice/json/FindTPSolutions`;
    private headers: Headers;

    constructor() {
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
     * @param {Locations} locations Departure and arrival locations
     * @param {Location} locations.departure Departure location
     * @param {location} locations.arrival Arrival location
     * @param {number} locations.departure.lat Latitude of the departure location
     * @param {number} locations.departure.lon Longitude of the departure location
     * @param {number} locations.arrival.lat Latitude of the arrival location
     * @param {number} locations.arrival.lon Longitude of the arrival location
     * @param {Dates} dates Object containing the departure and (optional) arrival dates
     * @param {Date} dates.departure Date of departure
     * @param {Date} [dates.arrival] Date of arrival (optional)
     * @param {Passengers} [passengers] Object containing the number of adults and children (optional)
     * @param {number} [passengers.adults] Number of adults (optional)
     * @param {number} [passengers.children] Number of children (optional)
     * @returns {Solutions} Solutions object
    */
    async getSolutions(locations: Locations, dates: Dates, passengers?: Passengers): Promise<Solutions | void> {
        if (!locations.departure || !locations.arrival) {
            Promise.reject(new Error('Missing departure or arrival location.'));
        }

        if (!dates.departure) {
            Promise.reject(new Error('Missing departure date.'));
        }
        
        // Make sure the locations are with six decimal places.
        const locationSettings: Locations = {
            departure: {
                lat: Math.round(locations.departure.lat * 1000000) / 1000000,
                lon: Math.round(locations.departure.lon * 1000000) / 1000000
            },
            arrival: {
                lat: Math.round(locations.arrival.lat * 1000000) / 1000000,
                lon: Math.round(locations.arrival.lon * 1000000) / 1000000
            }
        }

        // Convert dates to Unix timestamps because MyCicero only accepts them in this format.
        const datesSettings: UnixDates = {
            departure: Math.floor(dates.departure.getTime() / 1000),
            arrival: dates.arrival ? Math.floor(dates.arrival.getTime() / 1000) : undefined
        }

        console.log(`Searching for solutions from ${locationSettings.departure.lat}, ${locationSettings.departure.lon} to ${locationSettings.arrival.lat}, ${locationSettings.arrival.lon} on ${datesSettings.departure}.`);

        const requestBody = {
            "Ambiente": {
                "Ambiti": [
                    0
                ]
            },
            "NumeroAdulti": passengers?.adults ?? 1,
            "NumeroRagazzi": passengers?.children ?? 0,
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
                "Lat": locations.departure.lat,
                "Lng": locations.departure.lon
            },
            "PuntoDestinazione": {
                "Formato": 0,
                "Lat": locations.arrival.lat,
                "Lng": locations.arrival.lon
            },
            "NumMaxSoluzioni": 8,
            "Intermodale": false,
            "ModalitaRicerca": 0,
            "TipoPercorso": 0,
            "MaxDistanzaAPiedi": null
        }

        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(requestBody),
        });

        if (response.status !== 200) {
            Promise.reject(new Error(`Server responded with status code ${response.status}.`));
        }

        const data = await response.json();

        if (data.error) {
            Promise.reject(new Error(data.error));
        }

        return data;
    }
}