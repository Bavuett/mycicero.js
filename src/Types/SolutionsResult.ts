interface Coordinate {
    Formato: number;
    Lat: number;
    Lng: number;
}

interface LocalitaDiscesa {
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
    StopSequence?: any;
    Tipo: number;
    UrlRealtimePage?: any;
    VersioneTPS?: any;
}

interface Coordinate2 {
    Formato: number;
    Lat: number;
    Lng: number;
}

interface LocalitaSalita {
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
    StopSequence?: any;
    Tipo: number;
    UrlRealtimePage?: any;
    VersioneTPS?: any;
}

interface VendibilitaTratta {
    CodLocalitaDiscesa: string;
    CodLocalitaSalita: string;
    CodiceAmbiente: string;
    CodiceAzienda: string;
    IdSistema: string;
    NumeroTratta: number;
    OperazioniPossibili: number;
    PrezzoTratta?: any;
    TipoServizioTP?: any;
    Vendibile: boolean;
    ZonaTariffariaDiscesa?: any;
    ZonaTariffariaSalita?: any;
    _Messaggi?: any;
}

interface Linea {
    CodVettore?: any;
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
    PrenotazioneObbligatoria?: any;
    QuantitaFermate?: any;
    Settori?: any;
    Tipo: number;
    TipoServizio?: any;
    VersioneTPS?: any;
    Vettore: string;
}

interface InfoTreno {
    CodiceTreno: string;
    GruppoTreno: string;
    TipoTreno: string;
}

interface PittogrammiServizi {
    CodiceServizio: string;
    Descrizione: string;
    DescrizioneEstesa: string;
    IdServizio: number;
    NomeIcona: string;
}

interface Tratte {
    __type: string;
    LocalitaDiscesa: LocalitaDiscesa;
    LocalitaSalita: LocalitaSalita;
    Numero: number;
    TipoTratta: number;
    VendibilitaTratta: VendibilitaTratta;
    Corsa?: any;
    IdGru?: any;
    InfoPrenotazione?: any;
    Linea: Linea;
    OrarioArrivo: string;
    OrarioPartenza: string;
    offsetZonaMinuti?: any;
    InfoTreno: InfoTreno;
    PittogrammiServizi: PittogrammiServizi[];
    PrenotazioneObbligatoria: boolean;
}

interface TPFindRequestParams {
    ArrivalStation: string;
    DataPartenza: string;
    DepartureStation: string;
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
    NumeroArriviAlternativi: number;
    NumeroCambi: number;
    NumeroPartenzeAlternative: number;
    Partenza: string;
    PrimoMiglioRicercabile: boolean;
    SoluzioneExtra: boolean;
    Tipo: number;
    TipoSoluzione: string;
    Tratte: Tratte[];
    UltimoMiglioRicercabile: boolean;
    VersioneTPS: string;
    DataOraArrivo: string;
    DataOraPartenza: string;
    DettaglioImporti?: any;
    MetriBordo: number;
    MetriPiedi: number;
    MinutiBordo: number;
    MinutiPiedi: number;
    PrezzoSoluzione?: any;
    SoluzioneVendibile: boolean;
    TPFindRequestParams: TPFindRequestParams;
}

export default interface SolutionsResult {
    Codice?: any;
    Descrizione?: any;
    IdRichiesta: string;
    IdSistema: string;
    Tipo: number;
    Oggetti: Oggetti[];
}