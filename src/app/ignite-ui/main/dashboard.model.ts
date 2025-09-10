    export interface IDashboardAssetType {
        SravzId?: string;
        Name?: string;
        name?: string;
        region?: string;
        country?: string;
        lat?: number;
        lon?: number;
        Last?: number;
        value?: number;
        Change?: number;
        PercentChange?: number;
        pnlpercent?: number;
        linkText?: string;
        link?: string;
        text?: string;
        title?: string;
        linkParams?: string;
    }


    export interface IDashboard {
        etf: IDashboardAssetType[];
        futures: IDashboardAssetType[];
        index: IDashboardAssetType[];
        currency: IDashboardAssetType[];
        mutualfunds: IDashboardAssetType[];
        rates: IDashboardAssetType[];
        earnings: IDashboardAssetType[];
        fundamentals: IDashboardAssetType[];
        rss_feeds: IDashboardAssetType[];
        portfolios: IDashboardAssetType[];
        mortgagerates: IDashboardAssetType[];
        charts: IDashboardAssetType[];
        economiccalander: IDashboardAssetType[];
        analytics: IDashboardAssetType[];
    }

export interface Time {
    _isoformat: Date;
}

export interface Rate {
    SravzId: string;
    Country: string;
    Last: number;
    Name: string;
    RevisedDate: string;
    Time: Time;
}

export interface Time2 {
    _isoformat: Date;
}

export interface Crypto {
    SravzId: string;
    Change: number;
    Code: string;
    Country: string;
    Currency: string;
    Exchange: string;
    High: number;
    Last: number;
    Low: number;
    Name: string;
    Open: number;
    PercentChange: number;
    PreviousClose: number;
    Ticker: string;
    Time: Time2;
    Type: string;
    Volume: any;
}

export interface Time3 {
    _isoformat: Date;
}

export interface Stock {
    Ticker: string;
    AvgVolume: string;
    Change: any;
    Country: string;
    DayHigh: string;
    DayLow: string;
    Div?: any;
    DivYield?: any;
    EPS: string;
    ExDivDate?: any;
    Exchange: string;
    Last: any;
    MarketCap?: any;
    Name: string;
    PERatio: string;
    PercentChange: any;
    PercentPreviousChange?: any;
    PreviousClose: any;
    SNP: boolean;
    SravzId: string;
    Time: Time3;
    Close: number;
    Code: string;
    High: number;
    Low: number;
    Open: number;
    Volume: number;
    gmtoffset: number;
    PreviousChange?: any;
    RevPerEmployee?: any;
}

export interface Time4 {
    _isoformat: Date;
}

export interface Index {
    Ticker: string;
    CapitalLatitude: number;
    CapitalLongitude: number;
    CapitalName: string;
    Change: number;
    Code: string;
    ContinentName: string;
    Country: string;
    CountryName: string;
    Currency: string;
    Exchange: string;
    High: number;
    Last: number;
    Low: number;
    Name: string;
    Open: number;
    PercentChange: number;
    PreviousClose: number;
    SravzId: string;
    Time: Time4;
    Type: string;
    Volume: number;
    CountryCode: string;
    MajorIndex: boolean;
}

export interface Time5 {
    _isoformat: Date;
}

export interface Future {
    SravzId: string;
    APICode: string;
    Change: number;
    Code: string;
    Country: string;
    Currency: string;
    Exchange: string;
    High: number;
    Last: number;
    Low: number;
    Name: string;
    Open: number;
    PercentChange: number;
    PreviousClose: number;
    Ticker: string;
    Time: Time5;
    Type: string;
    Volume: number;
}

export interface Time6 {
    _isoformat: Date;
}

export interface Mortgage {
    SravzId: string;
    APR: string;
    Country: string;
    EMPper1000: string;
    InterestRate: string;
    Source: string;
    Terms: string;
    Time: Time6;
}

export interface Etf {
    ETFCode: string;
    Country: string;
    ETFName: string;
    Exchange: string;
    ISIN: string;
    SravzId: string;
}

export interface Mutualfund {
    SravzId: string;
    APICode: string;
    Code: string;
    Country: string;
    Currency: string;
    Exchange: string;
    Name: string;
    Type: string;
}

export interface Created {
    _isoformat: Date;
}

export interface Pnlcalculationdt {
    _isoformat: Date;
}

export interface Portfolio {
    name: string;
    description: string;
    cost: number;
    value: number;
    pnl: number;
    ispublic: boolean;
    created: Created;
    pnlcalculationdt: Pnlcalculationdt;
    __v: number;
    pnlpercent: number;
}

export interface IDashboardAPI {
    currency: any[];
    rates: Rate[];
    crypto: Crypto[];
    stocks: Stock[];
    index: Index[];
    futures: Future[];
    mortgage: Mortgage[];
    etf: Etf[];
    mutualfunds: Mutualfund[];
    earnings: any[];
    rss_feeds: any[];
    portfolios: Portfolio[];
}

