interface Headers {
    [key: string]: string;
}

interface Location {
    lat: number,
    lon: number;
}

interface Locations {
   departureLocation: Location; 
   arrivalLocation: Location;
}

interface Dates {
    departureDate: Date;
    arrivalDate?: Date;
}

interface Passengers {
    adults: number;
    children?: number;
}

export { Headers, Dates, Passengers, Locations };