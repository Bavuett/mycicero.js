import fetch from 'node-fetch';
import { Dates, Headers, Passengers } from '../Types/MyCicero';

class MyCicero {
    readonly baseUrl: string = `https://www.mycicero.it/OTPProxy/host.ashx?url=momoservice/json/FindTPSolutions`
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
     * @param {Dates} dates Object containing the departure and (optional) arrival dates
     * @param {Date} dates.departureDate Date of departure
     * @param {Date} [dates.arrivalDate] Date of arrival (optional)
     * @param {Passengers} [passengers] Object containing the number of adults and children (optional)
     * @param {number} [passengers.adults] Number of adults (optional)
     * @param {number} [passengers.children] Number of children (optional)
     * @returns {object} solutions object
    */
    async getSolutions(dates: Dates, passengers?: Passengers): Promise<void | Object> {
        const departure: number = Math.floor(dates.departureDate.getTime() / 1000);
        const arrival: number | null = dates.arrivalDate ? Math.floor(dates.arrivalDate.getTime() / 1000) : null;

        console.log(`departure: ${departure}`);

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
            "OraDa": `/Date(${departure}000+0200)/`,
            "OraA": arrival ? `/Date(${arrival}000+0200)/` : null,
            "ArrOraA": null,
            "ArrOraDa": null,
            "Ordinamento": {
                "Criterio": 0,
                "Direzione": 0
            },
            "ActivateRunsOnNextDay": true,
            "DataPartenza": `/Date(${departure}000+0200)/`,
            "PuntoOrigine": {
                "Formato": 0,
                "Lat": 42.48879000194779,
                "Lng": 14.180860023098461
            },
            "PuntoDestinazione": {
                "Formato": 0,
                "Lat": 42.470280,
                "Lng": 14.208690
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

        const data = await response.json();

        return data;
    }
}

export default MyCicero;