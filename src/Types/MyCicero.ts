interface Headers {
    [key: string]: string;
}


interface Passengers {
    adults: number;
    children?: number;
}

interface Dates {
    departureDate: Date;
    arrivalDate?: Date;
}

export { Headers, Passengers, Dates };