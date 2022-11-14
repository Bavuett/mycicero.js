interface Coordinate {
    Formato: number;
    Lat: number;
    Lng: number;
}

interface LocalitaDiscesa {
    __type: string;
    CodAzienda: string;
    CodGruppoFermate: string;
    Codice: string;
    Coordinate: Coordinate;
    Descrizione: string;
    TipoLocalita: number;
    CodiceFermataUtenza: string;
    CodiceInfoUtenza: string;
    Comune: string;
    IdSistema?: any;
    Indirizzo: string;
    ModalitaTrasporto: number;
    PesoLocalita?: any;
    Servizi?: any;
    StopSequence: number;
    Tipo: number;
    UrlRealtimePage: string;
    VersioneTPS?: any;
    Ambito?: any;
    Distanza?: any;
}

interface Coordinate2 {
    Formato: number;
    Lat: number;
    Lng: number;
}

interface LocalitaSalita {
    __type: string;
    CodAzienda: string;
    CodGruppoFermate: string;
    Codice: string;
    Coordinate: Coordinate2;
    Descrizione: string;
    TipoLocalita: number;
    CodiceFermataUtenza: string;
    CodiceInfoUtenza: string;
    Comune: string;
    IdSistema?: any;
    Indirizzo: string;
    ModalitaTrasporto: number;
    PesoLocalita?: any;
    Servizi?: any;
    StopSequence: number;
    Tipo: number;
    UrlRealtimePage: string;
    VersioneTPS?: any;
    Ambito?: any;
    Distanza?: any;
}

interface VendibilitaTratta {
    CodLocalitaDiscesa: string;
    CodLocalitaSalita: string;
    CodiceAmbiente: string;
    CodiceAzienda: string;
    IdSistema: string;
    NumeroTratta: number;
    OperazioniPossibili: number;
    PrezzoTratta: number;
    TipoServizioTP: string;
    Vendibile: boolean;
    ZonaTariffariaDiscesa: string;
    ZonaTariffariaSalita: string;
    _Messaggi?: any;
}

interface Corsa {
    Codice: string;
    CodiceAzienda: string;
    CodiceInfoUtenza: string;
    DataOraArrivo?: any;
    DataOraPartenza: Date;
    ID_Corsa: string;
    OrarioFermate?: any;
    PrenotazioneObbligatoria?: any;
}

interface Linea {
    CodVettore: string;
    Codice: string;
    CodiceAzienda: string;
    CodiceEsterno?: any;
    CodiceInfoUtenza: string;
    Colore?: any;
    Corse?: any;
    Descrizione: string;
    DescrizioneSettore?: any;
    DestinazioneAndata?: any;
    DestinazioneRitorno?: any;
    Direzione: string;
    Extraurbano: boolean;
    FileUrl?: any;
    Icona?: any;
    Id: string;
    IdSistema: string;
    LogoVettore: string;
    LogoVettoreApp: string;
    LogoVettoreEsteso: string;
    ModalitaTrasporto: number;
    PrenotazioneObbligatoria: boolean;
    QuantitaFermate?: any;
    Settori: any[];
    Tipo: number;
    TipoServizio: string;
    VersioneTPS?: any;
    Vettore: string;
}

interface Tratte {
    __type: string;
    LocalitaDiscesa: LocalitaDiscesa;
    LocalitaSalita: LocalitaSalita;
    Numero: number;
    TipoTratta: number;
    VendibilitaTratta: VendibilitaTratta;
    Corsa: Corsa;
    IdGru?: any;
    InfoPrenotazione?: any;
    Linea: Linea;
    OrarioArrivo: Date;
    OrarioPartenza: Date;
    offsetZonaMinuti: number;
}

interface DettaglioTariffe {
    RigaTariffa: number;
    Tariffa: string;
    TratteTariffabili: string[];
}

interface DettaglioImporti {
    CodiceArticolo: string;
    DettaglioTariffe: DettaglioTariffe[];
    Importo: number;
    NumeroTratteAssociate: number[];
}

interface Oggetti {
    __type: string;
    Ambito: number;
    Destinazione: string;
    EmissioneCO2: number;
    IdContesto: string;
    IdSistema: string;
    JourneySolutionCode: string;
    MetriTotali: number;
    MinutiTotali: number;
    ModalitaRicerca: number;
    Numero: number;
    NumeroArriviAlternativi?: any;
    NumeroCambi: number;
    NumeroPartenzeAlternative?: any;
    Partenza: string;
    PrimoMiglioRicercabile: boolean;
    SoluzioneExtra: boolean;
    Tipo: number;
    TipoSoluzione: string;
    Tratte: Tratte[];
    UltimoMiglioRicercabile: boolean;
    VersioneTPS: string;
    DataOraArrivo: Date;
    DataOraPartenza: Date;
    DettaglioImporti: DettaglioImporti[];
    MetriBordo: number;
    MetriPiedi: number;
    MinutiBordo: number;
    MinutiPiedi: number;
    PrezzoSoluzione: number;
}

export default interface Solutions {
    Codice?: any;
    Descrizione?: any;
    IdRichiesta: string;
    IdSistema: string;
    Tipo: number;
    Oggetti: Oggetti[];
}