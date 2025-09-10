export interface IETFTicker {
    id: string;
    SravzId: string;
    APICode: string;
    Code: string;
    Country: string;
    Currency: string;
    Exchange: string;
    Name: string;
    Type: string;
}

export interface ITechnicals {
    Beta: number;
    FiftyTwo_WeekHigh: number;
    FiftyTwo_WeekLow: number;
    Fifty_DayMA: number;
    Two_Hundred_DayMA: number;
}

export interface IFundamental {
    General: General;
    Technicals: ITechnicals;
    General2: General2;
    Market_Capitalisation: MarketCapitalisation;
    Asset_Allocation: AssetAllocationType[];
    WorldRegionHoldings: WorldRegionHolding[];
    Sector_Weights: SectorWeight[];
    FixedIncomeItems: FixedIncomeItem[];
    Top_10_Holdings: Holding[];
    Top_Holdings: MutualFundHolding[];
    Holdings: Holding[];
    ValuationsGrowth: ValuationsGrowth;
    MorningStar: MorningStar;
    Performance: {};
}


export class Fundamental implements IFundamental {
    code: string;
    datetime: Date;
    data: any;
    dataObject: any;
    General: General;
    Technicals: ITechnicals;
    General2: General2;
    Market_Capitalisation: MarketCapitalisation;
    Asset_Allocation: AssetAllocationType[];
    WorldRegionHoldings: WorldRegionHolding[];
    Sector_Weights: SectorWeight[];
    FixedIncomeItems: FixedIncomeItem[];
    Top_10_Holdings: Holding[];
    Top_Holdings: MutualFundHolding[];
    Holdings: Holding[];
    ValuationsGrowth: ValuationsGrowth;
    MorningStar: MorningStar;
    Performance: {};
    constructor(code: string, datetime: Date, data: string, dataObject: any) {
        try {
            this.code = code;
            this.datetime = datetime;
            this.data = data;
            this.dataObject = dataObject;
            // // Holders
            // this.Holders = new Holders(Object.values(dataObject.Holders.Institutions), Object.values(dataObject.Holders.Funds));
            this.General = dataObject.General;
            this.Technicals = <ITechnicals>{};
            this.Technicals = dataObject.Technicals; // ['Beta'];
            // this.Technicals.Fifty_DayMA = dataObject.Technicals['50DayMA'];
            // this.Technicals.FiftyTwo_WeekHigh = dataObject.Technicals['52WeekHigh'];
            // this.Technicals.FiftyTwo_WeekLow = dataObject.Technicals['52WeekLow'];
            // this.Technicals.Two_Hundred_DayMA = dataObject.Technicals['200DayMA'];
            this.General2 = <General2>{};
            this.General2 = dataObject.ETF_Data;
            this.Market_Capitalisation = dataObject.ETF_Data.Market_Capitalisation;
            delete dataObject.ETF_Data.Market_Capitalisation;

            try {
                this.Asset_Allocation = new Array<AssetAllocationType>();
                Object.keys(dataObject.ETF_Data.Asset_Allocation).map(x => {
                    dataObject.ETF_Data.Asset_Allocation[x]['Name'] = x;
                    this.Asset_Allocation.push(dataObject.ETF_Data.Asset_Allocation[x]);
                });
                delete dataObject.ETF_Data.Asset_Allocation;
            } catch {

            }

            try {
                this.WorldRegionHoldings = new Array<WorldRegionHolding>();
                Object.keys(dataObject.ETF_Data.World_Regions).map(x => {
                    dataObject.ETF_Data.World_Regions[x]['Name'] = x;
                    this.WorldRegionHoldings.push(dataObject.ETF_Data.World_Regions[x]);
                });
                delete dataObject.ETF_Data.World_Regions;
            } catch {

            }
            try {
                this.Sector_Weights = new Array<SectorWeight>();
                Object.keys(dataObject.ETF_Data.Sector_Weights).map(x => {
                    dataObject.ETF_Data.Sector_Weights[x]['Name'] = x;
                    this.Sector_Weights.push(dataObject.ETF_Data.Sector_Weights[x]);
                });
                delete dataObject.ETF_Data.Sector_Weights;
            } catch {

            }

            try {
                this.Top_Holdings = new Array<MutualFundHolding>();
                Object.values(dataObject.ETF_Data.Top_Holdings).map(x => this.Top_Holdings.push(x as MutualFundHolding));
                delete dataObject.ETF_Data.Top_Holdings;
            } catch {

            }

            try {
                this.Top_10_Holdings = new Array<Holding>();
                Object.values(dataObject.ETF_Data.Top_10_Holdings).map(x => this.Top_10_Holdings.push(x as Holding));
                delete dataObject.ETF_Data.Top_10_Holdings;
            } catch {

            }

            try {
                this.Holdings = new Array<Holding>();
                Object.values(dataObject.ETF_Data.Holdings).map(x => this.Holdings.push(x as Holding));
                delete dataObject.ETF_Data.Holdings;
            } catch {

            }
            try {
                this.MorningStar = <MorningStar>{};
                this.MorningStar = dataObject.ETF_Data.MorningStar;
                delete dataObject.ETF_Data.MorningStar;
            } catch {

            }

            try {
                this.FixedIncomeItems = new Array<FixedIncomeItem>();
                Object.keys(dataObject.ETF_Data.Fixed_Income).map(x => {
                    dataObject.ETF_Data.Fixed_Income[x]['Name'] = x;
                    this.FixedIncomeItems.push(dataObject.ETF_Data.Fixed_Income[x]);
                });
                delete dataObject.ETF_Data.Fixed_Income;
            } catch {

            }
            try {
                this.ValuationsGrowth = <ValuationsGrowth>{};
                this.ValuationsGrowth = dataObject.ETF_Data.Valuations_Growth as ValuationsGrowth;
                delete dataObject.ETF_Data.Valuations_Growth;
            } catch {

            }

            try {
                // this.ValuationsGrowth =  <ValuationsGrowth>{};
                this.Performance = dataObject.ETF_Data.Performance; // as ValuationsGrowth;
                delete dataObject.ETF_Data.Valuations_Growth;
            } catch {

            }

        } catch (Error) {
            // do nothing
        }
    }
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
    Description: string;
    Category: string;
    UpdatedAt: string;
}



export interface MarketCapitalisation {
}

export interface AssetAllocationType {
    Name: String;
    // Long_Percent: string;
    // Short_Percent: string;
    // Net_Assets_Percent: string;
}


export interface Cash {
    Long_Percent: string;
    Short_Percent: string;
    Net_Assets_Percent: string;
}

export interface NotClassified {
    Long_Percent: string;
    Short_Percent: string;
    Net_Assets_Percent: string;
}

export interface StockNonUS {
    Long_Percent: string;
    Short_Percent: string;
    Net_Assets_Percent: string;
}

export interface Other {
    Long_Percent: string;
    Short_Percent: string;
    Net_Assets_Percent: string;
}

export interface StockUS {
    Long_Percent: string;
    Short_Percent: string;
    Net_Assets_Percent: string;
}

export interface Bond {
    Long_Percent: string;
    Short_Percent: string;
    Net_Assets_Percent: string;
}

export interface AssetAllocation {
    Cash: Cash;
    NotClassified: NotClassified;
    Stock_Non_US: StockNonUS;
    Other: Other;
    Stock_US: StockUS;
    Bond: Bond;
}

export interface WorldRegionHolding {
    Name: string;
    Equity_Percent: string;
    Relative_to_Category: string;
}

export interface WorldRegions {
    WorldRegionHoldings: WorldRegionHolding[];
}

export interface SectorWeight {
    Name: string;
    Equity_Percent: string;
    Relative_to_Category: string;
}

export interface SectorWeights {
    SectorWeights: SectorWeight[];
}

export interface FixedIncomeItem {
    Name: string;
}
export interface EffectiveDuration {
    Fund_Percent: string;
    Relative_to_Category: string;
}

export interface ModifiedDuration {
    Fund_Percent: string;
    Relative_to_Category: string;
}

export interface EffectiveMaturity {
    Fund_Percent: string;
    Relative_to_Category: string;
}

export interface CreditQuality {
    Fund_Percent: string;
    Relative_to_Category: string;
}

export interface Coupon {
    Fund_Percent: string;
    Relative_to_Category: string;
}

export interface Price {
    Fund_Percent: string;
    Relative_to_Category: string;
}

export interface YieldToMaturity {
    Fund_Percent: string;
    Relative_to_Category: string;
}

export interface FixedIncome {
    EffectiveDuration: EffectiveDuration;
    ModifiedDuration: ModifiedDuration;
    EffectiveMaturity: EffectiveMaturity;
    CreditQuality: CreditQuality;
    Coupon: Coupon;
    Price: Price;
    YieldToMaturity: YieldToMaturity;
}

export interface Holding {
    Code: string;
    Exchange: string;
    Name: string;
    Sector: string;
    Industry: string;
    Country: string;
    Region: string;
    Assets_Percent: number;
}

export interface MutualFundHolding {
    Name: string;
    Owned: number;
    Changed: number;
    Weight: number;
}

export interface ValuationsRatesPortfolio {
    Price_Prospective_Earnings: string;
    Price_Book: string;
    Price_Sales: string;
    Price_Cash_Flow: string;
    Dividend_Yield_Factor: string;
}

export interface ValuationsRatesToCategory {
    Price_Prospective_Earnings: string;
    Price_Book: string;
    Price_Sales: string;
    Price_Cash_Flow: string;
    Dividend_Yield_Factor: string;
}

export interface GrowthRatesPortfolio {
    Long_Term_Projected_Earnings_Growth: string;
    Historical_Earnings_Growth: string;
    Sales_Growth: string;
    Cash_Flow_Growth: string;
    Book_Value_Growth: string;
}

export interface GrowthRatesToCategory {
    Long_Term_Projected_Earnings_Growth: string;
    Historical_Earnings_Growth: string;
    Sales_Growth: string;
    Cash_Flow_Growth: string;
    Book_Value_Growth: string;
}

export interface ValuationsGrowth {
    Valuations_Rates_Portfolio: ValuationsRatesPortfolio;
    Valuations_Rates_To_Category: ValuationsRatesToCategory;
    Growth_Rates_Portfolio: GrowthRatesPortfolio;
    Growth_Rates_To_Category: GrowthRatesToCategory;
}

export interface MorningStar {
    Ratio: string;
    Category_Benchmark: string;
    Sustainability_Ratio: string;
}

export interface Performance {

}

export interface General2 {
    ISIN: string;
    Company_Name: string;
    Company_URL: string;
    ETF_URL: string;
    Yield: string;
    Dividend_Paying_Frequency: string;
    Inception_Date: string;
    Max_Annual_Mgmt_Charge: string;
    Ongoing_Charge: string;
    Date_Ongoing_Charge: string;
    NetExpenseRatio: string;
    AnnualHoldingsTurnover: string;
    TotalAssets: string;
    Average_Mkt_Cap_Mil: string;
    /*     Market_Capitalisation: MarketCapitalisation;
        Asset_Allocation: AssetAllocation;
        World_Regions: WorldRegions;
        Sector_Weights: SectorWeights;
        Fixed_Income: FixedIncome;
        Top_10_Holdings: Holding[];
        Holdings: Holding[];

        MorningStar: MorningStar;
        Performance: Performance; */
}
