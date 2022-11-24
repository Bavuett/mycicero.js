interface Coordinate {
    Formato: number;
    Lat: number;
    Lng: number;
}

interface Fermata {
    __type: string;
    CodAzienda: string;
    CodGruppoFermate: string;
    Codice: string;
    Coordinate: Coordinate;
    Descrizione: string;
    TipoLocalita?: any;
    CodiceFermataUtenza: string;
    CodiceInfoUtenza: string;
    Comune: string;
    IdSistema: string;
    Indirizzo: string;
    ModalitaTrasporto: number;
    PesoLocalita?: any;
    Servizi?: any;
    StopSequence?: any;
    Tipo: number;
    UrlRealtimePage: string;
    VersioneTPS?: any;
    Ambito?: any;
    Distanza?: any;
}

interface Oggetto {
    Fermata: Fermata;
    MessaggiRealTime?: any;
    Passaggi: any[];
    PassaggiLinee: any[];
    PassaggiPerLinea?: any;
}

export default interface StopsResult {
    Codice?: any;
    Descrizione?: any;
    IdRichiesta?: any;
    IdSistema: string;
    Tipo: number;
    Oggetto: Oggetto;
}

