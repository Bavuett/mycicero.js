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

interface Routes {
    line: Line;
    departure: Stop;
    arrival: Stop;
}

interface Line {
    description: string;
    lineNumber: string;
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
    // TipoSoluzione.
    type: string;
    price: number;
    minutes: Minutes;
    meters: Meters;
    routes: Routes[];
    departure: Date;
    arrival: Date;
    co2Emission: number;
}

export interface Solutions {
    solutions: Solution[];
}