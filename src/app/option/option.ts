export interface IOptionTicker {
    SravzId: string;
    Ticker: string;
    Code: string;
    Exchange: string;
    Country: string;
    Name: string;
}

export interface CALL {
    contractName: string;
    contractSize: string;
    contractPeriod: string;
    currency: string;
    type: string;
    inTheMoney: string;
    lastTradeDateTime: string;
    expirationDate: string;
    strike: number;
    lastPrice: number;
    bid: number;
    ask: number;
    change: number;
    changePercent?: number;
    volume?: number;
    openInterest?: number;
    impliedVolatility: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
    theoretical: number;
    intrinsicValue: number;
    timeValue: number;
    updatedAt: string;
    daysBeforeExpiration: number;
}

export interface PUT {
    contractName: string;
    contractSize: string;
    contractPeriod: string;
    currency: string;
    type: string;
    inTheMoney: string;
    lastTradeDateTime: string;
    expirationDate: string;
    strike: number;
    lastPrice: number;
    bid: number;
    ask: number;
    change: number;
    changePercent?: number;
    volume?: number;
    openInterest?: number;
    impliedVolatility: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
    theoretical: number;
    intrinsicValue: number;
    timeValue: number;
    updatedAt: string;
    daysBeforeExpiration: number;
}

export interface Options {
    CALL: CALL[];
    PUT: PUT[];
}

export interface Datum {
    expirationDate: string;
    impliedVolatility: number;
    putVolume: number;
    callVolume: number;
    putCallVolumeRatio: number;
    putOpenInterest: number;
    callOpenInterest: number;
    putCallOpenInterestRatio: number;
    optionsCount: number;
    options: Options;
}

export interface IData {
    code: string;
    exchange: string;
    lastTradeDate: string;
    lastTradePrice: number;
    data: Datum[];
}


export interface IOption {
    datetime: Date;
    code: string;
    data: IData;
}

export class OptionAsset implements IOption {
    code: string;
    datetime: Date;
    data: IData;
    constructor(code: string, datetime: Date, data: IData) {
        this.code = code;
        this.datetime = datetime;
        this.data = data;
    }
}

