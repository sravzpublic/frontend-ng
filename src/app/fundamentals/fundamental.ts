export interface IFundamental {
    code: string;
    datetime: Date;
    data: string;
    dataObject: any;
}

export interface IStockTicker {
    Ticker: string;
    Country: string;
    Exchange: string;
    Name: string;
    SravzId: string;
}

export class Fundamental implements IFundamental {
    code: string;
    datetime: Date;
    data: any;
    dataObject: any;
    Holders: Holders;
    General: General;
    Highlights: Highlights;
    Valuation: Valuation;
    SharesStats: SharesStats;
    SplitsDividends: SplitsDividends;
    AnalystRatings: AnalystRatings;
    ESGScores: ESGScores;
    OutstandingShares: OutstandingShares;
    Components: IndexComponent[];
    constructor(code: string, datetime: Date, data: string, dataObject: any) {
        try {
            this.code = code;
            this.datetime = datetime;
            this.data = data;
            this.dataObject = dataObject;
            // Holders
            this.Holders = new Holders(Object.values(dataObject?.Holders?.Institutions), Object.values(dataObject?.Holders?.Funds));
            this.General = dataObject?.General;
            // Listings
            this.General.Listings = Object.values(dataObject?.General?.Listings).map(x => x as Listing);
            this.General.Officers = Object.values(dataObject?.General?.Officers).map(x => x as Officer);
            this.Highlights = dataObject?.Highlights;
            this.Valuation = dataObject?.Valuation;
            this.SharesStats = dataObject?.SharesStats;
            this.SplitsDividends = dataObject?.SplitsDividends;
            this.SplitsDividends.NumberDividendsByYear =
                Object.values(dataObject.SplitsDividends?.NumberDividendsByYear).map(x => x as NumberDividendsByYearCount);
            this.AnalystRatings = dataObject?.AnalystRatings;
            this.ESGScores = dataObject?.ESGScores;
            this.ESGScores.ActivitiesInvolvement =
                Object.values(dataObject?.ESGScores?.ActivitiesInvolvement).map(x => x as ActivitiesInvolvementType);
            this.OutstandingShares = new OutstandingShares(Object.values(dataObject?.outstandingShares?.annual).map(x => x as Annual),
                Object.values(dataObject?.outstandingShares?.quarterly).map(x => x as Quarterly));
            // Index components
            this.Components = Object.values(dataObject?.Components).map(x => x as IndexComponent);
        } catch (Error) {
            // do nothing
        }
    }
}

export class Holders {
    Institutions: Holder[];
    Funds: Holder[];
    constructor(institutions: Holder[], funds: Holder[]) {
        this.Institutions = institutions;
        this.Funds = funds;
    }
}
export interface Holder {
    name: string;
    date: string;
    totalShares: number;
    totalAssets: number;
    currentShares: number;
    change: number;
    change_p: number;
}

export interface General {
    Code: string;
    Type: string;
    Name: string;
    Exchange: string;
    CurrencyCode: string;
    CurrencyName: string;
    CurrencySymbol: string;
    CountryName: string;
    CountryISO: string;
    ISIN: string;
    CUSIP: string;
    CIK: string;
    EmployerIdNumber: string;
    FiscalYearEnd: string;
    IPODate: string;
    InternationalDomestic: string;
    Sector: string;
    Industry: string;
    GicSector: string;
    GicGroup: string;
    GicIndustry: string;
    GicSubIndustry: string;
    HomeCategory: string;
    IsDelisted: boolean;
    Description: string;
    Address: string;
    AddressData: AddressData;
    Listings: Listing[];
    Officers: Officer[];
    Phone: string;
    WebURL: string;
    LogoURL: string;
    FullTimeEmployees: number;
    UpdatedAt: string;
}

export interface IndexComponent {
    Code: string;
    Exchange: string;
    Name: string;
    Sector: string;
    Industry: string;
}

export interface AddressData {
    Street: string;
    City: string;
    State: string;
    Country: string;
    ZIP: string;
}

export interface Listing {
    Code: string;
    Exchange: string;
    Name: string;
}

export interface Highlights {
    MarketCapitalization: number;
    MarketCapitalizationMln: number;
    EBITDA: number;
    PERatio: number;
    PEGRatio: number;
    WallStreetTargetPrice: number;
    BookValue: number;
    DividendShare: number;
    DividendYield: number;
    EarningsShare: number;
    EPSEstimateCurrentYear: number;
    EPSEstimateNextYear: number;
    EPSEstimateNextQuarter: number;
    EPSEstimateCurrentQuarter: number;
    MostRecentQuarter: string;
    ProfitMargin: number;
    OperatingMarginTTM: number;
    ReturnOnAssetsTTM: number;
    ReturnOnEquityTTM: number;
    RevenueTTM: number;
    RevenuePerShareTTM: number;
    QuarterlyRevenueGrowthYOY: number;
    GrossProfitTTM: number;
    DilutedEpsTTM: number;
    QuarterlyEarningsGrowthYOY: number;
}

export interface Valuation {
    TrailingPE: number;
    ForwardPE: number;
    PriceSalesTTM: number;
    PriceBookMRQ: number;
    EnterpriseValueRevenue: number;
    EnterpriseValueEbitda: number;
}

export interface SharesStats {
    SharesOutstanding: number;
    SharesFloat: number;
    PercentInsiders: number;
    PercentInstitutions: number;
    SharesShort: number;
    SharesShortPriorMonth: number;
    ShortRatio: number;
    ShortPercentOutstanding: number;
    ShortPercentFloat: number;
}

export interface SplitsDividends {
    ForwardAnnualDividendRate: number;
    ForwardAnnualDividendYield: number;
    PayoutRatio: number;
    DividendDate: string;
    ExDividendDate: string;
    LastSplitFactor: string;
    LastSplitDate: string;
    NumberDividendsByYear: NumberDividendsByYearCount[];
}

export interface NumberDividendsByYearCount {
    Year: number;
    Count: number;
}

export interface AnalystRatings {
    Rating: number;
    TargetPrice: number;
    StrongBuy: number;
    Buy: number;
    Hold: number;
    Sell: number;
    StrongSell: number;
}


export interface ESGScores {
    RatingDate: string;
    TotalEsg: number;
    TotalEsgPercentile: number;
    EnvironmentScore: number;
    EnvironmentScorePercentile: number;
    SocialScore: number;
    SocialScorePercentile: number;
    GovernanceScore: number;
    GovernanceScorePercentile: number;
    ControversyLevel: number;
    ActivitiesInvolvement: ActivitiesInvolvementType[];
}

export interface ActivitiesInvolvementType {
    Activity: string;
    Involvement: string;
}

export interface Officer {
        Name: string;
        Title: string;
        YearBorn: string;
}

export class OutstandingShares {
    Annual: Annual[];
    Quarterly: Quarterly[];
    constructor(annual: Annual[], quarterly: Quarterly[]) {
        this.Annual = annual;
        this.Quarterly = quarterly;
    }
}

export interface Annual {
    date: string;
    dateFormatted: string;
    sharesMln: string;
    shares: number;
}

export interface Quarterly {
    date: string;
    dateFormatted: string;
    sharesMln: string;
    shares: number;
}

// export interface Technicals {
//     Beta: number;
//     52WeekHigh: number;
//     52WeekLow: number;
//     50DayMA: number;
//     200DayMA: number;
//     SharesShort: number;
//     SharesShortPriorMonth: number;
//     ShortRatio: number;
//     ShortPercent: number;
// }

/***
declare module namespace {

    export interface AddressData {
        Street: string;
        City: string;
        State: string;
        Country: string;
        ZIP: string;
    }

    export interface 02 {
        Code: string;
        Exchange: string;
        Name: string;
    }

    export interface 12 {
        Code: string;
        Exchange: string;
        Name: string;
    }

    export interface 22 {
        Code: string;
        Exchange: string;
        Name: string;
    }

    export interface Listings {
        0: 02;
        1: 12;
        2: 22;
    }

    export interface 03 {
        Name: string;
        Title: string;
        YearBorn: string;
    }

    export interface 13 {
        Name: string;
        Title: string;
        YearBorn: string;
    }

    export interface 23 {
        Name: string;
        Title: string;
        YearBorn: string;
    }

    export interface 32 {
        Name: string;
        Title: string;
        YearBorn: string;
    }

    export interface 42 {
        Name: string;
        Title: string;
        YearBorn: string;
    }

    export interface Officers {
        0: 03;
        1: 13;
        2: 23;
        3: 32;
        4: 42;
    }

    export interface General {
        Code: string;
        Type: string;
        Name: string;
        Exchange: string;
        CurrencyCode: string;
        CurrencyName: string;
        CurrencySymbol: string;
        CountryName: string;
        CountryISO: string;
        ISIN: string;
        CUSIP: string;
        CIK: string;
        EmployerIdNumber: string;
        FiscalYearEnd: string;
        IPODate: string;
        InternationalDomestic: string;
        Sector: string;
        Industry: string;
        GicSector: string;
        GicGroup: string;
        GicIndustry: string;
        GicSubIndustry: string;
        HomeCategory: string;
        IsDelisted: boolean;
        Description: string;
        Address: string;
        AddressData: AddressData;
        Listings: Listings;
        Officers: Officers;
        Phone: string;
        WebURL: string;
        LogoURL: string;
        FullTimeEmployees: number;
        UpdatedAt: string;
    }

    export interface Highlights {
        MarketCapitalization: number;
        MarketCapitalizationMln: number;
        EBITDA: number;
        PERatio: number;
        PEGRatio: number;
        WallStreetTargetPrice: number;
        BookValue: number;
        DividendShare: number;
        DividendYield: number;
        EarningsShare: number;
        EPSEstimateCurrentYear: number;
        EPSEstimateNextYear: number;
        EPSEstimateNextQuarter: number;
        EPSEstimateCurrentQuarter: number;
        MostRecentQuarter: string;
        ProfitMargin: number;
        OperatingMarginTTM: number;
        ReturnOnAssetsTTM: number;
        ReturnOnEquityTTM: number;
        RevenueTTM: number;
        RevenuePerShareTTM: number;
        QuarterlyRevenueGrowthYOY: number;
        GrossProfitTTM: number;
        DilutedEpsTTM: number;
        QuarterlyEarningsGrowthYOY: number;
    }

    export interface Valuation {
        TrailingPE: number;
        ForwardPE: number;
        PriceSalesTTM: number;
        PriceBookMRQ: number;
        EnterpriseValueRevenue: number;
        EnterpriseValueEbitda: number;
    }

    export interface SharesStats {
        SharesOutstanding: number;
        SharesFloat: number;
        PercentInsiders: number;
        PercentInstitutions: number;
        SharesShort: number;
        SharesShortPriorMonth: number;
        ShortRatio: number;
        ShortPercentOutstanding: number;
        ShortPercentFloat: number;
    }

    export interface Technicals {
        Beta: number;
        52WeekHigh: number;
        52WeekLow: number;
        50DayMA: number;
        200DayMA: number;
        SharesShort: number;
        SharesShortPriorMonth: number;
        ShortRatio: number;
        ShortPercent: number;
    }

    export interface 04 {
        Year: number;
        Count: number;
    }

    export interface 18 {
        Year: number;
        Count: number;
    }

    export interface 24 {
        Year: number;
        Count: number;
    }

    export interface 33 {
        Year: number;
        Count: number;
    }

    export interface 43 {
        Year: number;
        Count: number;
    }

    export interface 52 {
        Year: number;
        Count: number;
    }

    export interface 62 {
        Year: number;
        Count: number;
    }

    export interface 72 {
        Year: number;
        Count: number;
    }

    export interface 82 {
        Year: number;
        Count: number;
    }

    export interface 92 {
        Year: number;
        Count: number;
    }

    export interface 102 {
        Year: number;
        Count: number;
    }

    export interface 112 {
        Year: number;
        Count: number;
    }

    export interface 122 {
        Year: number;
        Count: number;
    }

    export interface 132 {
        Year: number;
        Count: number;
    }

    export interface 142 {
        Year: number;
        Count: number;
    }

    export interface 152 {
        Year: number;
        Count: number;
    }

    export interface 162 {
        Year: number;
        Count: number;
    }

    export interface 172 {
        Year: number;
        Count: number;
    }

    export interface NumberDividendsByYear {
        0: 04;
        1: 18;
        2: 24;
        3: 33;
        4: 43;
        5: 52;
        6: 62;
        7: 72;
        8: 82;
        9: 92;
        10: 102;
        11: 112;
        12: 122;
        13: 132;
        14: 142;
        15: 152;
        16: 162;
        17: 172;
    }

    export interface SplitsDividends {
        ForwardAnnualDividendRate: number;
        ForwardAnnualDividendYield: number;
        PayoutRatio: number;
        DividendDate: string;
        ExDividendDate: string;
        LastSplitFactor: string;
        LastSplitDate: string;
        NumberDividendsByYear: NumberDividendsByYear;
    }

    export interface AnalystRatings {
        Rating: number;
        TargetPrice: number;
        StrongBuy: number;
        Buy: number;
        Hold: number;
        Sell: number;
        StrongSell: number;
    }

    export interface 05 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 110 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 25 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 34 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 44 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 53 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 63 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 73 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 83 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 93 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 103 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 113 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 123 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 133 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 143 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 153 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 163 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 173 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 182 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 192 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface Institutions {
        0: 05;
        1: 110;
        2: 25;
        3: 34;
        4: 44;
        5: 53;
        6: 63;
        7: 73;
        8: 83;
        9: 93;
        10: 103;
        11: 113;
        12: 123;
        13: 133;
        14: 143;
        15: 153;
        16: 163;
        17: 173;
        18: 182;
        19: 192;
    }

    export interface 06 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 111 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 26 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 35 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 45 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 54 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 64 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 74 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 84 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 94 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 104 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 114 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 124 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 134 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 144 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 154 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 164 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 174 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 183 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface 193 {
        name: string;
        date: string;
        totalShares: number;
        totalAssets: number;
        currentShares: number;
        change: number;
        change_p: number;
    }

    export interface Funds {
        0: 06;
        1: 111;
        2: 26;
        3: 35;
        4: 45;
        5: 54;
        6: 64;
        7: 74;
        8: 84;
        9: 94;
        10: 104;
        11: 114;
        12: 124;
        13: 134;
        14: 144;
        15: 154;
        16: 164;
        17: 174;
        18: 183;
        19: 193;
    }

    export interface Holders {
        Institutions: Institutions;
        Funds: Funds;
    }

    export interface 07 {
        Activity: string;
        Involvement: string;
    }

    export interface 115 {
        Activity: string;
        Involvement: string;
    }

    export interface 27 {
        Activity: string;
        Involvement: string;
    }

    export interface 36 {
        Activity: string;
        Involvement: string;
    }

    export interface 46 {
        Activity: string;
        Involvement: string;
    }

    export interface 55 {
        Activity: string;
        Involvement: string;
    }

    export interface 65 {
        Activity: string;
        Involvement: string;
    }

    export interface 75 {
        Activity: string;
        Involvement: string;
    }

    export interface 85 {
        Activity: string;
        Involvement: string;
    }

    export interface 95 {
        Activity: string;
        Involvement: string;
    }

    export interface 105 {
        Activity: string;
        Involvement: string;
    }

    export interface 116 {
        Activity: string;
        Involvement: string;
    }

    export interface 125 {
        Activity: string;
        Involvement: string;
    }

    export interface 135 {
        Activity: string;
        Involvement: string;
    }

    export interface 145 {
        Activity: string;
        Involvement: string;
    }

    export interface ActivitiesInvolvement {
        0: 07;
        1: 115;
        2: 27;
        3: 36;
        4: 46;
        5: 55;
        6: 65;
        7: 75;
        8: 85;
        9: 95;
        10: 105;
        11: 116;
        12: 125;
        13: 135;
        14: 145;
    }

    export interface ESGScores {
        RatingDate: string;
        TotalEsg: number;
        TotalEsgPercentile: number;
        EnvironmentScore: number;
        EnvironmentScorePercentile: number;
        SocialScore: number;
        SocialScorePercentile: number;
        GovernanceScore: number;
        GovernanceScorePercentile: number;
        ControversyLevel: number;
        ActivitiesInvolvement: ActivitiesInvolvement;
    }

                        export interface 08 {
                            date: string;
                            dateFormatted: string;
                            sharesMln: string;
                            shares: number;
                        }

    export interface 117 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 28 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 37 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 47 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 56 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 66 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 76 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 86 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 96 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 106 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 118 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 126 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 136 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 146 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface Annual {
        0: 08;
        1: 117;
        2: 28;
        3: 37;
        4: 47;
        5: 56;
        6: 66;
        7: 76;
        8: 86;
        9: 96;
        10: 106;
        11: 118;
        12: 126;
        13: 136;
        14: 146;
    }

    export interface 09 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 119 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 210 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 310 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 410 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 510 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 67 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 77 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 87 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 97 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 107 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 1110 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 127 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 137 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 147 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 155 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 165 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 175 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 184 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 194 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 202 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 212 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 222 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 232 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 242 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 252 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 262 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 272 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 282 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 292 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 302 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 312 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 322 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 332 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 342 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 352 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 362 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 372 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 382 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 392 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 402 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 412 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 422 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 432 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 442 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 452 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 462 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 472 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 482 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 492 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 502 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 512 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 522 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 532 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 542 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 552 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 562 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 572 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 582 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 592 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 602 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface 612 {
        date: string;
        dateFormatted: string;
        sharesMln: string;
        shares: number;
    }

    export interface Quarterly {
        0: 09;
        1: 119;
        2: 210;
        3: 310;
        4: 410;
        5: 510;
        6: 67;
        7: 77;
        8: 87;
        9: 97;
        10: 107;
        11: 1110;
        12: 127;
        13: 137;
        14: 147;
        15: 155;
        16: 165;
        17: 175;
        18: 184;
        19: 194;
        20: 202;
        21: 212;
        22: 222;
        23: 232;
        24: 242;
        25: 252;
        26: 262;
        27: 272;
        28: 282;
        29: 292;
        30: 302;
        31: 312;
        32: 322;
        33: 332;
        34: 342;
        35: 352;
        36: 362;
        37: 372;
        38: 382;
        39: 392;
        40: 402;
        41: 412;
        42: 422;
        43: 432;
        44: 442;
        45: 452;
        46: 462;
        47: 472;
        48: 482;
        49: 492;
        50: 502;
        51: 512;
        52: 522;
        53: 532;
        54: 542;
        55: 552;
        56: 562;
        57: 572;
        58: 582;
        59: 592;
        60: 602;
        61: 612;
    }

    export interface OutstandingShares {
        annual: Annual;
        quarterly: Quarterly;
    }

    export interface 20210630 {
        reportDate: string;
        date: string;
        epsActual?: any;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20210331 {
        reportDate: string;
        date: string;
        epsActual?: any;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20201231 {
        reportDate: string;
        date: string;
        epsActual?: any;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20200930 {
        reportDate: string;
        date: string;
        epsActual?: any;
        epsEstimate: number;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20200630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20200331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20191231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20190930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20190630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20190331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20181231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20180930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20180630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20180331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20171231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20170930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20170630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20170331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20161231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20160930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20160630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20160331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20151231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20150930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20150630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20150331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20141231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20140930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20140630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20140331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20131231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20130930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20130630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20130331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20121231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20120930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20120630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20120331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20111231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20110930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20110630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20110331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20101231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20100930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20100630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20100331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20091231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20090930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20090630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20090331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20081231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20080930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20080630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20080331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20071231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20070930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20070630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20070331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20061231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20060930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20060630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20060331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20051231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20050930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20050630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20050331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20041231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20040930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20040630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20040331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20031231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20030930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20030630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20030331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20021231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20020930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20020630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20020331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20011231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20010930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20010630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20010331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20001231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20000930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 20000630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 20000331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19991231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19990930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19990630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19990331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19981231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19980930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19980630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19980331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19971231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19970930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 19970630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19970331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19961231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19960930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19960630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19960331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19951231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19950930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19950630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19950331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate: number;
        epsDifference: number;
        surprisePercent: number;
    }

    export interface 19941231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 19940930 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 19940630 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 19940331 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface 19931231 {
        reportDate: string;
        date: string;
        epsActual: number;
        epsEstimate?: any;
        epsDifference?: any;
        surprisePercent?: any;
    }

    export interface History {
        2021-06-30: 20210630;
        2021-03-31: 20210331;
        2020-12-31: 20201231;
        2020-09-30: 20200930;
        2020-06-30: 20200630;
        2020-03-31: 20200331;
        2019-12-31: 20191231;
        2019-09-30: 20190930;
        2019-06-30: 20190630;
        2019-03-31: 20190331;
        2018-12-31: 20181231;
        2018-09-30: 20180930;
        2018-06-30: 20180630;
        2018-03-31: 20180331;
        2017-12-31: 20171231;
        2017-09-30: 20170930;
        2017-06-30: 20170630;
        2017-03-31: 20170331;
        2016-12-31: 20161231;
        2016-09-30: 20160930;
        2016-06-30: 20160630;
        2016-03-31: 20160331;
        2015-12-31: 20151231;
        2015-09-30: 20150930;
        2015-06-30: 20150630;
        2015-03-31: 20150331;
        2014-12-31: 20141231;
        2014-09-30: 20140930;
        2014-06-30: 20140630;
        2014-03-31: 20140331;
        2013-12-31: 20131231;
        2013-09-30: 20130930;
        2013-06-30: 20130630;
        2013-03-31: 20130331;
        2012-12-31: 20121231;
        2012-09-30: 20120930;
        2012-06-30: 20120630;
        2012-03-31: 20120331;
        2011-12-31: 20111231;
        2011-09-30: 20110930;
        2011-06-30: 20110630;
        2011-03-31: 20110331;
        2010-12-31: 20101231;
        2010-09-30: 20100930;
        2010-06-30: 20100630;
        2010-03-31: 20100331;
        2009-12-31: 20091231;
        2009-09-30: 20090930;
        2009-06-30: 20090630;
        2009-03-31: 20090331;
        2008-12-31: 20081231;
        2008-09-30: 20080930;
        2008-06-30: 20080630;
        2008-03-31: 20080331;
        2007-12-31: 20071231;
        2007-09-30: 20070930;
        2007-06-30: 20070630;
        2007-03-31: 20070331;
        2006-12-31: 20061231;
        2006-09-30: 20060930;
        2006-06-30: 20060630;
        2006-03-31: 20060331;
        2005-12-31: 20051231;
        2005-09-30: 20050930;
        2005-06-30: 20050630;
        2005-03-31: 20050331;
        2004-12-31: 20041231;
        2004-09-30: 20040930;
        2004-06-30: 20040630;
        2004-03-31: 20040331;
        2003-12-31: 20031231;
        2003-09-30: 20030930;
        2003-06-30: 20030630;
        2003-03-31: 20030331;
        2002-12-31: 20021231;
        2002-09-30: 20020930;
        2002-06-30: 20020630;
        2002-03-31: 20020331;
        2001-12-31: 20011231;
        2001-09-30: 20010930;
        2001-06-30: 20010630;
        2001-03-31: 20010331;
        2000-12-31: 20001231;
        2000-09-30: 20000930;
        2000-06-30: 20000630;
        2000-03-31: 20000331;
        1999-12-31: 19991231;
        1999-09-30: 19990930;
        1999-06-30: 19990630;
        1999-03-31: 19990331;
        1998-12-31: 19981231;
        1998-09-30: 19980930;
        1998-06-30: 19980630;
        1998-03-31: 19980331;
        1997-12-31: 19971231;
        1997-09-30: 19970930;
        1997-06-30: 19970630;
        1997-03-31: 19970331;
        1996-12-31: 19961231;
        1996-09-30: 19960930;
        1996-06-30: 19960630;
        1996-03-31: 19960331;
        1995-12-31: 19951231;
        1995-09-30: 19950930;
        1995-06-30: 19950630;
        1995-03-31: 19950331;
        1994-12-31: 19941231;
        1994-09-30: 19940930;
        1994-06-30: 19940630;
        1994-03-31: 19940331;
        1993-12-31: 19931231;
    }

    export interface 20210930 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 202012312 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 202009302 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 202006302 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 202003312 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth?: any;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 201912312 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth?: any;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 201909302 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 201906302 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 201903312 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 201812312 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 201809302 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 201806302 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 201803312 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 201712312 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 201709302 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface 201706302 {
        date: string;
        period: string;
        growth: string;
        earningsEstimateAvg: string;
        earningsEstimateLow: string;
        earningsEstimateHigh: string;
        earningsEstimateYearAgoEps: string;
        earningsEstimateNumberOfAnalysts: string;
        earningsEstimateGrowth: string;
        revenueEstimateAvg: string;
        revenueEstimateLow: string;
        revenueEstimateHigh: string;
        revenueEstimateYearAgoEps?: any;
        revenueEstimateNumberOfAnalysts: string;
        revenueEstimateGrowth: string;
        epsTrendCurrent: string;
        epsTrend7daysAgo: string;
        epsTrend30daysAgo: string;
        epsTrend60daysAgo: string;
        epsTrend90daysAgo: string;
        epsRevisionsUpLast7days: string;
        epsRevisionsUpLast30days: string;
        epsRevisionsDownLast30days: string;
        epsRevisionsDownLast90days?: any;
    }

    export interface Trend {
        2021-09-30: 20210930;
        2020-12-31: 202012312;
        2020-09-30: 202009302;
        2020-06-30: 202006302;
        2020-03-31: 202003312;
        2019-12-31: 201912312;
        2019-09-30: 201909302;
        2019-06-30: 201906302;
        2019-03-31: 201903312;
        2018-12-31: 201812312;
        2018-09-30: 201809302;
        2018-06-30: 201806302;
        2018-03-31: 201803312;
        2017-12-31: 201712312;
        2017-09-30: 201709302;
        2017-06-30: 201706302;
    }

    export interface 202009303 {
        date: string;
        epsActual: number;
    }

    export interface 201909303 {
        date: string;
        epsActual: number;
    }

    export interface 201809303 {
        date: string;
        epsActual: number;
    }

    export interface 201709303 {
        date: string;
        epsActual: number;
    }

    export interface 201609302 {
        date: string;
        epsActual: number;
    }

    export interface 201509302 {
        date: string;
        epsActual: number;
    }

    export interface 201409302 {
        date: string;
        epsActual: number;
    }

    export interface 201309302 {
        date: string;
        epsActual: number;
    }

    export interface 201209302 {
        date: string;
        epsActual: number;
    }

    export interface 201109302 {
        date: string;
        epsActual: number;
    }

    export interface 201009302 {
        date: string;
        epsActual: number;
    }

    export interface 200909302 {
        date: string;
        epsActual: number;
    }

    export interface 200809302 {
        date: string;
        epsActual: number;
    }

    export interface 200709302 {
        date: string;
        epsActual: number;
    }

    export interface 200609302 {
        date: string;
        epsActual: number;
    }

    export interface 200509302 {
        date: string;
        epsActual: number;
    }

    export interface 200409302 {
        date: string;
        epsActual: number;
    }

    export interface 200309302 {
        date: string;
        epsActual: number;
    }

    export interface 200209302 {
        date: string;
        epsActual: number;
    }

    export interface 200109302 {
        date: string;
        epsActual: number;
    }

    export interface 200009302 {
        date: string;
        epsActual: number;
    }

    export interface 199909302 {
        date: string;
        epsActual: number;
    }

    export interface 199809302 {
        date: string;
        epsActual: number;
    }

    export interface 199709302 {
        date: string;
        epsActual: number;
    }

    export interface 199609302 {
        date: string;
        epsActual: number;
    }

    export interface 199509302 {
        date: string;
        epsActual: number;
    }

    export interface 199409302 {
        date: string;
        epsActual: number;
    }

    export interface Annual2 {
        2020-09-30: 202009303;
        2019-09-30: 201909303;
        2018-09-30: 201809303;
        2017-09-30: 201709303;
        2016-09-30: 201609302;
        2015-09-30: 201509302;
        2014-09-30: 201409302;
        2013-09-30: 201309302;
        2012-09-30: 201209302;
        2011-09-30: 201109302;
        2010-09-30: 201009302;
        2009-09-30: 200909302;
        2008-09-30: 200809302;
        2007-09-30: 200709302;
        2006-09-30: 200609302;
        2005-09-30: 200509302;
        2004-09-30: 200409302;
        2003-09-30: 200309302;
        2002-09-30: 200209302;
        2001-09-30: 200109302;
        2000-09-30: 200009302;
        1999-09-30: 199909302;
        1998-09-30: 199809302;
        1997-09-30: 199709302;
        1996-09-30: 199609302;
        1995-09-30: 199509302;
        1994-09-30: 199409302;
    }

    export interface Earnings {
        History: History;
        Trend: Trend;
        Annual: Annual2;
    }

    export interface 202006303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill?: any;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity: string;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity: string;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 202003313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill?: any;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity: string;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity: string;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201912313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill?: any;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity: string;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity: string;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201909304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill?: any;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity: string;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity: string;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201906303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill?: any;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity: string;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity: string;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201903313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill?: any;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity: string;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity: string;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201812313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill?: any;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity: string;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity: string;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201809304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201806303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201803313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201712313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201709304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201706303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201703312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201612312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201609303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201606302 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201603312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201512312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201509303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201506302 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201503312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201412312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201409303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201406302 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201403312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201312312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201309303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201306302 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201303312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201212312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201209303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201206302 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201203312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201112312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201109303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201106302 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201103312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201012312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201009303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201006302 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201003312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200912312 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200909303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200906302 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200903312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200812312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200809303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200806302 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200803312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200712312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200709303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200706302 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200703312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200612312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200609303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200606302 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200603312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200512312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200509303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200506302 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200503312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200412312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200409303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200406302 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200403312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200312312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200309303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200306302 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200303312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200212312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200209303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200206302 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200203312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200112312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill: string;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200109303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill?: any;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200106302 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill?: any;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200103312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill?: any;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200012312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill?: any;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200009303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill?: any;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200006302 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill?: any;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200003312 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill?: any;
        otherAssets: string;
        cash?: any;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments?: any;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface Quarterly2 {
        2020-06-30: 202006303;
        2020-03-31: 202003313;
        2019-12-31: 201912313;
        2019-09-30: 201909304;
        2019-06-30: 201906303;
        2019-03-31: 201903313;
        2018-12-31: 201812313;
        2018-09-30: 201809304;
        2018-06-30: 201806303;
        2018-03-31: 201803313;
        2017-12-31: 201712313;
        2017-09-30: 201709304;
        2017-06-30: 201706303;
        2017-03-31: 201703312;
        2016-12-31: 201612312;
        2016-09-30: 201609303;
        2016-06-30: 201606302;
        2016-03-31: 201603312;
        2015-12-31: 201512312;
        2015-09-30: 201509303;
        2015-06-30: 201506302;
        2015-03-31: 201503312;
        2014-12-31: 201412312;
        2014-09-30: 201409303;
        2014-06-30: 201406302;
        2014-03-31: 201403312;
        2013-12-31: 201312312;
        2013-09-30: 201309303;
        2013-06-30: 201306302;
        2013-03-31: 201303312;
        2012-12-31: 201212312;
        2012-09-30: 201209303;
        2012-06-30: 201206302;
        2012-03-31: 201203312;
        2011-12-31: 201112312;
        2011-09-30: 201109303;
        2011-06-30: 201106302;
        2011-03-31: 201103312;
        2010-12-31: 201012312;
        2010-09-30: 201009303;
        2010-06-30: 201006302;
        2010-03-31: 201003312;
        2009-12-31: 200912312;
        2009-09-30: 200909303;
        2009-06-30: 200906302;
        2009-03-31: 200903312;
        2008-12-31: 200812312;
        2008-09-30: 200809303;
        2008-06-30: 200806302;
        2008-03-31: 200803312;
        2007-12-31: 200712312;
        2007-09-30: 200709303;
        2007-06-30: 200706302;
        2007-03-31: 200703312;
        2006-12-31: 200612312;
        2006-09-30: 200609303;
        2006-06-30: 200606302;
        2006-03-31: 200603312;
        2005-12-31: 200512312;
        2005-09-30: 200509303;
        2005-06-30: 200506302;
        2005-03-31: 200503312;
        2004-12-31: 200412312;
        2004-09-30: 200409303;
        2004-06-30: 200406302;
        2004-03-31: 200403312;
        2003-12-31: 200312312;
        2003-09-30: 200309303;
        2003-06-30: 200306302;
        2003-03-31: 200303312;
        2002-12-31: 200212312;
        2002-09-30: 200209303;
        2002-06-30: 200206302;
        2002-03-31: 200203312;
        2001-12-31: 200112312;
        2001-09-30: 200109303;
        2001-06-30: 200106302;
        2001-03-31: 200103312;
        2000-12-31: 200012312;
        2000-09-30: 200009303;
        2000-06-30: 200006302;
        2000-03-31: 200003312;
    }

    export interface 201909305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill?: any;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity: string;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity: string;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201809305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill?: any;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity: string;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity: string;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201709305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201609304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity: string;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity: string;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201509304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201409304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt: string;
        shortLongTermDebt: string;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201309304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal: string;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201209304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201109304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 201009304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200909304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab: string;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity: string;
        propertyPlantEquipment: string;
        totalCurrentAssets: string;
        longTermInvestments: string;
        netTangibleAssets: string;
        shortTermInvestments: string;
        netReceivables: string;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity: string;
        noncontrollingInterestInConsolidatedEntity: string;
        temporaryEquityRedeemableNoncontrollingInterests: string;
        accumulatedOtherComprehensiveIncome: string;
        additionalPaidInCapital: string;
        commonStockTotalEquity: string;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity: string;
        treasuryStock: string;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther: string;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal: string;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther: string;
        nonCurrentLiabilitiesTotal: string;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity: string;
        cashAndShortTermInvestments: string;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200809304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200709304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200609304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200509304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding: string;
    }

    export interface 200409304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200309304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab: string;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt?: any;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200209304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets: string;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill: string;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200109304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill?: any;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity?: any;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface 200009304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        totalAssets: string;
        intangibleAssets?: any;
        earningAssets?: any;
        otherCurrentAssets: string;
        totalLiab: string;
        totalStockholderEquity: string;
        deferredLongTermLiab?: any;
        otherCurrentLiab: string;
        commonStock: string;
        retainedEarnings: string;
        otherLiab?: any;
        goodWill?: any;
        otherAssets: string;
        cash: string;
        totalCurrentLiabilities: string;
        shortTermDebt?: any;
        shortLongTermDebt?: any;
        shortLongTermDebtTotal?: any;
        otherStockholderEquity?: any;
        propertyPlantEquipment: string;
        totalCurrentAssets?: any;
        longTermInvestments?: any;
        netTangibleAssets?: any;
        shortTermInvestments: string;
        netReceivables?: any;
        longTermDebt: string;
        inventory: string;
        accountsPayable: string;
        totalPermanentEquity?: any;
        noncontrollingInterestInConsolidatedEntity?: any;
        temporaryEquityRedeemableNoncontrollingInterests?: any;
        accumulatedOtherComprehensiveIncome?: any;
        additionalPaidInCapital?: any;
        commonStockTotalEquity?: any;
        preferredStockTotalEquity: string;
        retainedEarningsTotalEquity?: any;
        treasuryStock?: any;
        accumulatedAmortization?: any;
        nonCurrrentAssetsOther?: any;
        deferredLongTermAssetCharges?: any;
        nonCurrentAssetsTotal?: any;
        capitalLeaseObligations?: any;
        longTermDebtTotal?: any;
        nonCurrentLiabilitiesOther?: any;
        nonCurrentLiabilitiesTotal?: any;
        negativeGoodwill?: any;
        warrants?: any;
        preferredStockRedeemable?: any;
        capitalSurpluse?: any;
        liabilitiesAndStockholdersEquity?: any;
        cashAndShortTermInvestments?: any;
        propertyPlantAndEquipmentGross?: any;
        accumulatedDepreciation?: any;
        commonStockSharesOutstanding?: any;
    }

    export interface Yearly {
        2019-09-30: 201909305;
        2018-09-30: 201809305;
        2017-09-30: 201709305;
        2016-09-30: 201609304;
        2015-09-30: 201509304;
        2014-09-30: 201409304;
        2013-09-30: 201309304;
        2012-09-30: 201209304;
        2011-09-30: 201109304;
        2010-09-30: 201009304;
        2009-09-30: 200909304;
        2008-09-30: 200809304;
        2007-09-30: 200709304;
        2006-09-30: 200609304;
        2005-09-30: 200509304;
        2004-09-30: 200409304;
        2003-09-30: 200309304;
        2002-09-30: 200209304;
        2001-09-30: 200109304;
        2000-09-30: 200009304;
    }

    export interface BalanceSheet {
        currency_symbol: string;
        quarterly: Quarterly2;
        yearly: Yearly;
    }

    export interface 202006304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 202003314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201912314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201909306 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201906304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201903314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201812314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201809306 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201806304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201803314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201712314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201709306 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201706304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201703313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201612313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201609305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201606303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201603313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201512313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201509305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201506303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201503313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201412313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201409305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201406303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201403313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201312313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201309305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201306303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201303313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201212313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201209305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201206303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201203313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201112313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201109305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201106303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201103313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201012313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201009305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201006303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201003313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 200912313 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 200909305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200906303 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200903313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200812313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200809305 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200806303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200803313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200712313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200709305 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200706303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200703313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200612313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200609305 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200606303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200603313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200512313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200509305 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200506303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200503313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200412313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200409305 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200406303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200403313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities?: any;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200312313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200309305 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200306303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200303313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200212313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome?: any;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200209305 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200206303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200203313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200112313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200109305 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200106303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities?: any;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200103313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities?: any;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200012313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome?: any;
        changeInCash?: any;
        totalCashFromOperatingActivities?: any;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200009305 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities?: any;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200006303 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities?: any;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200003313 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface Quarterly3 {
        2020-06-30: 202006304;
        2020-03-31: 202003314;
        2019-12-31: 201912314;
        2019-09-30: 201909306;
        2019-06-30: 201906304;
        2019-03-31: 201903314;
        2018-12-31: 201812314;
        2018-09-30: 201809306;
        2018-06-30: 201806304;
        2018-03-31: 201803314;
        2017-12-31: 201712314;
        2017-09-30: 201709306;
        2017-06-30: 201706304;
        2017-03-31: 201703313;
        2016-12-31: 201612313;
        2016-09-30: 201609305;
        2016-06-30: 201606303;
        2016-03-31: 201603313;
        2015-12-31: 201512313;
        2015-09-30: 201509305;
        2015-06-30: 201506303;
        2015-03-31: 201503313;
        2014-12-31: 201412313;
        2014-09-30: 201409305;
        2014-06-30: 201406303;
        2014-03-31: 201403313;
        2013-12-31: 201312313;
        2013-09-30: 201309305;
        2013-06-30: 201306303;
        2013-03-31: 201303313;
        2012-12-31: 201212313;
        2012-09-30: 201209305;
        2012-06-30: 201206303;
        2012-03-31: 201203313;
        2011-12-31: 201112313;
        2011-09-30: 201109305;
        2011-06-30: 201106303;
        2011-03-31: 201103313;
        2010-12-31: 201012313;
        2010-09-30: 201009305;
        2010-06-30: 201006303;
        2010-03-31: 201003313;
        2009-12-31: 200912313;
        2009-09-30: 200909305;
        2009-06-30: 200906303;
        2009-03-31: 200903313;
        2008-12-31: 200812313;
        2008-09-30: 200809305;
        2008-06-30: 200806303;
        2008-03-31: 200803313;
        2007-12-31: 200712313;
        2007-09-30: 200709305;
        2007-06-30: 200706303;
        2007-03-31: 200703313;
        2006-12-31: 200612313;
        2006-09-30: 200609305;
        2006-06-30: 200606303;
        2006-03-31: 200603313;
        2005-12-31: 200512313;
        2005-09-30: 200509305;
        2005-06-30: 200506303;
        2005-03-31: 200503313;
        2004-12-31: 200412313;
        2004-09-30: 200409305;
        2004-06-30: 200406303;
        2004-03-31: 200403313;
        2003-12-31: 200312313;
        2003-09-30: 200309305;
        2003-06-30: 200306303;
        2003-03-31: 200303313;
        2002-12-31: 200212313;
        2002-09-30: 200209305;
        2002-06-30: 200206303;
        2002-03-31: 200203313;
        2001-12-31: 200112313;
        2001-09-30: 200109305;
        2001-06-30: 200106303;
        2001-03-31: 200103313;
        2000-12-31: 200012313;
        2000-09-30: 200009305;
        2000-06-30: 200006303;
        2000-03-31: 200003313;
    }

    export interface 201909307 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201809307 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201709307 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201609306 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201509306 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201409306 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities: string;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201309306 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings: string;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201209306 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201109306 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 201009306 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 200909306 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        investments: string;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash: string;
        totalCashFromOperatingActivities: string;
        depreciation: string;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid: string;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock: string;
        otherCashflowsFromFinancingActivities: string;
        changeToNetincome: string;
        capitalExpenditures: string;
        changeReceivables: string;
        cashFlowsOtherOperating: string;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges: string;
    }

    export interface 200809306 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200709306 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200609306 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200509306 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200409306 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200309306 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities: string;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200209306 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200109306 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities?: any;
        totalCashflowsFromInvestingActivities: string;
        netBorrowings?: any;
        totalCashFromFinancingActivities: string;
        changeToOperatingActivities?: any;
        netIncome?: any;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory: string;
        changeToAccountReceivables: string;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface 200009306 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        investments?: any;
        changeToLiabilities: string;
        totalCashflowsFromInvestingActivities?: any;
        netBorrowings?: any;
        totalCashFromFinancingActivities?: any;
        changeToOperatingActivities?: any;
        netIncome: string;
        changeInCash?: any;
        totalCashFromOperatingActivities: string;
        depreciation?: any;
        otherCashflowsFromInvestingActivities?: any;
        dividendsPaid?: any;
        changeToInventory?: any;
        changeToAccountReceivables?: any;
        salePurchaseOfStock?: any;
        otherCashflowsFromFinancingActivities?: any;
        changeToNetincome?: any;
        capitalExpenditures: string;
        changeReceivables?: any;
        cashFlowsOtherOperating?: any;
        exchangeRateChanges?: any;
        cashAndCashEquivalentsChanges?: any;
    }

    export interface Yearly2 {
        2019-09-30: 201909307;
        2018-09-30: 201809307;
        2017-09-30: 201709307;
        2016-09-30: 201609306;
        2015-09-30: 201509306;
        2014-09-30: 201409306;
        2013-09-30: 201309306;
        2012-09-30: 201209306;
        2011-09-30: 201109306;
        2010-09-30: 201009306;
        2009-09-30: 200909306;
        2008-09-30: 200809306;
        2007-09-30: 200709306;
        2006-09-30: 200609306;
        2005-09-30: 200509306;
        2004-09-30: 200409306;
        2003-09-30: 200309306;
        2002-09-30: 200209306;
        2001-09-30: 200109306;
        2000-09-30: 200009306;
    }

    export interface CashFlow {
        currency_symbol: string;
        quarterly: Quarterly3;
        yearly: Yearly2;
    }

    export interface 202006305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision: string;
        interestIncome: string;
        netInterestIncome: string;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 202003315 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision: string;
        interestIncome: string;
        netInterestIncome: string;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201912315 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision: string;
        interestIncome: string;
        netInterestIncome: string;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201909308 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision: string;
        interestIncome: string;
        netInterestIncome: string;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201906305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision: string;
        interestIncome: string;
        netInterestIncome: string;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201903315 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision: string;
        interestIncome: string;
        netInterestIncome: string;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201812315 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201809308 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201806305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201803315 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201712315 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201709308 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201706305 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201703314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201612314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201609307 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201606304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201603314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201512314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201509307 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201506304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201503314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201412314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201409307 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201406304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201403314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201312314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201309307 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201306304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201303314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201212314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201209307 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201206304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201203314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201112314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201109307 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201106304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201103314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201012314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201009307 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201006304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201003314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200912314 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200909307 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200906304 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200903314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200812314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200809307 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200806304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200803314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200712314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200709307 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200706304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200703314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200612314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200609307 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200606304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200603314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200512314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200509307 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200506304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200503314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200412314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200409307 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200406304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200403314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200312314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200309307 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200306304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200303314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200212314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200209307 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200206304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200203314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200112314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200109307 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200106304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200103314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200012314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges: string;
        incomeBeforeTax: string;
        minorityInterest: string;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses: string;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring: string;
        otherItems: string;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations: string;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200009307 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit?: any;
        ebit?: any;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses?: any;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet?: any;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps?: any;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200006304 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit?: any;
        ebit?: any;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses?: any;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet?: any;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps?: any;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200003314 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit?: any;
        ebit?: any;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses?: any;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet?: any;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps?: any;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface Quarterly4 {
        2020-06-30: 202006305;
        2020-03-31: 202003315;
        2019-12-31: 201912315;
        2019-09-30: 201909308;
        2019-06-30: 201906305;
        2019-03-31: 201903315;
        2018-12-31: 201812315;
        2018-09-30: 201809308;
        2018-06-30: 201806305;
        2018-03-31: 201803315;
        2017-12-31: 201712315;
        2017-09-30: 201709308;
        2017-06-30: 201706305;
        2017-03-31: 201703314;
        2016-12-31: 201612314;
        2016-09-30: 201609307;
        2016-06-30: 201606304;
        2016-03-31: 201603314;
        2015-12-31: 201512314;
        2015-09-30: 201509307;
        2015-06-30: 201506304;
        2015-03-31: 201503314;
        2014-12-31: 201412314;
        2014-09-30: 201409307;
        2014-06-30: 201406304;
        2014-03-31: 201403314;
        2013-12-31: 201312314;
        2013-09-30: 201309307;
        2013-06-30: 201306304;
        2013-03-31: 201303314;
        2012-12-31: 201212314;
        2012-09-30: 201209307;
        2012-06-30: 201206304;
        2012-03-31: 201203314;
        2011-12-31: 201112314;
        2011-09-30: 201109307;
        2011-06-30: 201106304;
        2011-03-31: 201103314;
        2010-12-31: 201012314;
        2010-09-30: 201009307;
        2010-06-30: 201006304;
        2010-03-31: 201003314;
        2009-12-31: 200912314;
        2009-09-30: 200909307;
        2009-06-30: 200906304;
        2009-03-31: 200903314;
        2008-12-31: 200812314;
        2008-09-30: 200809307;
        2008-06-30: 200806304;
        2008-03-31: 200803314;
        2007-12-31: 200712314;
        2007-09-30: 200709307;
        2007-06-30: 200706304;
        2007-03-31: 200703314;
        2006-12-31: 200612314;
        2006-09-30: 200609307;
        2006-06-30: 200606304;
        2006-03-31: 200603314;
        2005-12-31: 200512314;
        2005-09-30: 200509307;
        2005-06-30: 200506304;
        2005-03-31: 200503314;
        2004-12-31: 200412314;
        2004-09-30: 200409307;
        2004-06-30: 200406304;
        2004-03-31: 200403314;
        2003-12-31: 200312314;
        2003-09-30: 200309307;
        2003-06-30: 200306304;
        2003-03-31: 200303314;
        2002-12-31: 200212314;
        2002-09-30: 200209307;
        2002-06-30: 200206304;
        2002-03-31: 200203314;
        2001-12-31: 200112314;
        2001-09-30: 200109307;
        2001-06-30: 200106304;
        2001-03-31: 200103314;
        2000-12-31: 200012314;
        2000-09-30: 200009307;
        2000-06-30: 200006304;
        2000-03-31: 200003314;
    }

    export interface 201909309 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision: string;
        interestIncome: string;
        netInterestIncome: string;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201809309 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision: string;
        interestIncome: string;
        netInterestIncome: string;
        extraordinaryItems: string;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201709309 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision: string;
        interestIncome: string;
        netInterestIncome: string;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201609308 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision: string;
        interestIncome: string;
        netInterestIncome: string;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201509308 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision: string;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201409308 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201309308 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201209308 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201109308 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 201009308 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200909308 {
        date: string;
        filing_date: string;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit: string;
        nonOperatingIncomeNetOther: string;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses: string;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet: string;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps: string;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200809308 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit?: any;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense?: any;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses?: any;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet?: any;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps?: any;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200709308 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit?: any;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense?: any;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses?: any;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet?: any;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps?: any;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200609308 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit?: any;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense?: any;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses?: any;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet?: any;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps?: any;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200509308 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit?: any;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense?: any;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses?: any;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet?: any;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps?: any;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200409308 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit?: any;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses?: any;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet?: any;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps?: any;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200309308 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit?: any;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses?: any;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet?: any;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps?: any;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200209308 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit?: any;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses?: any;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet?: any;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps?: any;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200109308 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax?: any;
        minorityInterest?: any;
        netIncome?: any;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit?: any;
        nonOperatingIncomeNetOther?: any;
        operatingIncome?: any;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems: string;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense?: any;
        totalRevenue: string;
        totalOperatingExpenses?: any;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet?: any;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps?: any;
        netIncomeApplicableToCommonShares?: any;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface 200009308 {
        date: string;
        filing_date?: any;
        currency_symbol: string;
        researchDevelopment: string;
        effectOfAccountingCharges?: any;
        incomeBeforeTax: string;
        minorityInterest?: any;
        netIncome: string;
        sellingGeneralAdministrative: string;
        grossProfit: string;
        ebit?: any;
        nonOperatingIncomeNetOther?: any;
        operatingIncome: string;
        otherOperatingExpenses?: any;
        interestExpense: string;
        taxProvision?: any;
        interestIncome?: any;
        netInterestIncome?: any;
        extraordinaryItems?: any;
        nonRecurring?: any;
        otherItems?: any;
        incomeTaxExpense: string;
        totalRevenue: string;
        totalOperatingExpenses?: any;
        costOfRevenue: string;
        totalOtherIncomeExpenseNet?: any;
        discontinuedOperations?: any;
        netIncomeFromContinuingOps?: any;
        netIncomeApplicableToCommonShares: string;
        preferredStockAndOtherAdjustments?: any;
    }

    export interface Yearly3 {
        2019-09-30: 201909309;
        2018-09-30: 201809309;
        2017-09-30: 201709309;
        2016-09-30: 201609308;
        2015-09-30: 201509308;
        2014-09-30: 201409308;
        2013-09-30: 201309308;
        2012-09-30: 201209308;
        2011-09-30: 201109308;
        2010-09-30: 201009308;
        2009-09-30: 200909308;
        2008-09-30: 200809308;
        2007-09-30: 200709308;
        2006-09-30: 200609308;
        2005-09-30: 200509308;
        2004-09-30: 200409308;
        2003-09-30: 200309308;
        2002-09-30: 200209308;
        2001-09-30: 200109308;
        2000-09-30: 200009308;
    }

    export interface IncomeStatement {
        currency_symbol: string;
        quarterly: Quarterly4;
        yearly: Yearly3;
    }

    export interface Financials {
        Balance_Sheet: BalanceSheet;
        Cash_Flow: CashFlow;
        Income_Statement: IncomeStatement;
    }

    export interface RootObject {
        General: General;
        Highlights: Highlights;
        Valuation: Valuation;
        SharesStats: SharesStats;
        Technicals: Technicals;
        SplitsDividends: SplitsDividends;
        AnalystRatings: AnalystRatings;
        Holders: Holders;
        ESGScores: ESGScores;
        outstandingShares: OutstandingShares;
        Earnings: Earnings;
        Financials: Financials;
    }

}
**/
