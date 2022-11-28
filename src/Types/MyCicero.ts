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

type MeanOfTransport = 'bus' | 'train' | 'underground';

interface GetSolutionsSettings {
    locations: Locations;
    dates: Dates;
    passengers?: Passengers;
    meanOfTransport?: MeanOfTransport;
}

interface GetNearestStopsSettings {
    location: Location;
    radius?: number;
}

interface GetSolutionsParams {
    locations: Locations;
    dates: UnixDates;
    passengers: Passengers;
    meanOfTransport: MeanOfTransport;
}

interface NearestStopsFetchParams {
    location: Location;
    radius: number;
}

export { 
    Headers, 
    Dates, 
    UnixDates, 
    Passengers, 
    Location, 
    Locations,
    MeanOfTransport, 
    GetSolutionsSettings, 
    GetNearestStopsSettings, 
    GetSolutionsParams, 
    NearestStopsFetchParams 
};