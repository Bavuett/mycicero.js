import { Headers } from '../Typings/MyCicero';

class MyCicero {
    readonly baseurl: string = `https://www.mycicero.it/OTPProxy/host.ashx?url=momoservice/json/FindTPSolutions`
    private headers: Headers;

    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Host': 'www.mycicero.it',
            'Origin': 'https://www.mycicero.it',
            'Referer': 'https://www.mycicero.it/orari-trasporto/it/solutions',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
        }
    }

    sayHello() {
        console.log('Hello from MyCicero.js');
    }
}

export default MyCicero;