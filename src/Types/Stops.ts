interface Location {
    lat: number,
    lon: number
}

interface Stop {
    description: string,
    stopCode: string,
    company: string,
    location: Location;
    city: string,
    distance: number,
}

export default interface Stops {
    stops: Stop[],
}