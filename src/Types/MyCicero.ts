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

interface GetSolutionsSettings {
    locations: Locations;
    dates: Dates;
    passengers?: Passengers;
}

interface GetNearestStopsSettings {
    location: Location;
    radius?: number;
}

interface NearestStopsFetchParams {
    location: Location;
    radius: number;
}

export { Headers, Dates, UnixDates, Passengers, Location, Locations, GetSolutionsSettings, GetNearestStopsSettings, NearestStopsFetchParams };