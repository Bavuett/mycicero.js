interface Headers {
    [key: string]: string;
}

interface Location {
    lat: number,
    lon: number;
}

interface Locations {
   departure: Location; 
   arrival: Location;
}

interface Dates {
    departure: Date;
    arrival?: Date;
}

interface UnixDates {
    departure: number;
    arrival?: number;
}

interface Passengers {
    adults: number;
    children?: number;
}

export { Headers, Dates, UnixDates, Passengers, Location, Locations };