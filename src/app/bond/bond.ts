export interface IBondTicker {
    SravzId: string;
    APICode: string;
    Code: string;
    Country: string;
    Currency: string;
    Exchange: string;
    Isin: string;
    Name: string;
    Ticker: string;
    Type: string;
}



export interface ClassificationData {
    BondType: string;
    DebtType: string;
    IndustryGroup: string;
    IndustrySubGroup: string;
    SubProductAsset: string;
    SubProductAssetType: string;
}

export interface Rating {
    MoodyRating: string;
    MoodyRatingUpdateDate: string;
    SPRating: string;
    SPRatingUpdateDate: string;
}

export interface IssueData {
    IssueDate: string;
    OfferingDate: string;
    FirstCouponDate: string;
    FirstTradingDay: string;
    CouponPaymentFrequency: string;
    Issuer: string;
    IssuerDescription: string;
    IssuerCountry: string;
    IssuerURL?: any;
}

export interface Data {
    ISIN: string;
    CUSIP: string;
    Name: string;
    UpdateDate: string;
    WKN: string;
    Sedol?: any;
    FIGI?: any;
    Currency: string;
    Coupon: string;
    Price: string;
    LastTradeDate: string;
    Maturity_Date: string;
    YieldToMaturity: string;
    Callable: string;
    NextCallDate?: any;
    MinimumSettlementAmount: string;
    ParIntegralMultiple: string;
    ClassificationData: ClassificationData;
    Rating: Rating;
    IssueData: IssueData;
}

export interface IBond {
    datetime: Date;
    code: string;
    data: Data;
}

export class Bond implements IBond {
    code: string;
    datetime: Date;
    data: Data;
    constructor(code: string, datetime: Date, data: Data) {
        this.code = code;
        this.datetime = datetime;
        this.data = data;
    }
}































