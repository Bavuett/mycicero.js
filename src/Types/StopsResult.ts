interface Coordinate {
    Formato: number;
    Lat: number;
    Lng: number;
}

interface Oggetti {
    CodAzienda: string;
    CodGruppoFermate: string;
    Codice: string;
    Coordinate: Coordinate;
    Descrizione: string;
    TipoLocalita: number;
    CodiceFermataUtenza: string;
    CodiceInfoUtenza: string;
    Comune: string;
    IdSistema: string;
    Indirizzo?: any;
    ModalitaTrasporto: number;
    PesoLocalita: number;
    Servizi?: any;
    StopSequence?: any;
    Tipo: number;
    UrlRealtimePage?: any;
    VersioneTPS: string;
    Ambito: number;
    Distanza: number;
}

export default interface StopsResult {
    Codice?: any;
    Descrizione?: any;
    IdRichiesta?: any;
    IdSistema: string;
    Tipo: number;
    Oggetti: Oggetti[];
}

