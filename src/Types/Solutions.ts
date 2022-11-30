interface Minutes {
    total: number;
    onFoot: number;
    onVehicle: number;
}

interface Meters {
    total: number;
    onFoot: number;
    onVehicle: number | null;
}

interface Route {
    line: Line;
    departure: Stop;
    arrival: Stop;
}

interface Line {
    description: string;
    lineNumber: string;
    code: string,
    company: Company;
    bookingNeeded: boolean;
    type: string;
    extraurban: boolean;
}

interface Stop {
    description: string;
    location: Location;
}

interface Location {
    lat: number;
    lon: number;
}

interface Company {
    code: string;
    name: string;
    logoUrl: string;
}

interface Solution {
    type: string;
    price: number | string;
    minutes: Minutes;
    meters: Meters;
    routes: Route[];
    departure: number;
    arrival: number;
    co2Emission: number;
}

export default interface Solutions {
    solutions: Solution[];
}

export { Route, Solution };