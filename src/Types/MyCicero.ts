interface Headers {
    [key: string]: string;
}


interface Passengers {
    adults: number;
    children?: number;
}

export { Headers, Passengers };