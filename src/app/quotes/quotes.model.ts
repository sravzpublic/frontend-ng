export interface IQuote {
  '_id': string;
  'id': string;
  'SravzId': string;
  'Last': number;
  'Commodity': string;
  'Name': string;
  'MajorIndex': boolean;
  'Chg': number;
  'Country': string;
  'Month': string;
  'Open': number;
  'High': number;
  'Low': number;
  'Time': Date;
  'Chg_Pct': number;
  'Exchange': string;
  'Symbol': string;
  'CNBCSymbol': string;
  'Volume': number;
  'OpenInterest': number;
  'SettlePrice': number;
  'SettleDate': Date;
  'pricecapturetime': Date;
  'Ticker': string;
  'CapitalLatitude': number;
  'CapitalLongitude': number;
  'CapitalName': string;
  'Change': string;
  'Code': string;
  'ContinentName': string;
  'CountryName': string;
  'PercentChange': number;
  'PreviousClose': number;
  'Currency': string;
  'Type': string;
  'CountryCode': string;
  'ETFCode': string;
  'ETFName': string
}

export interface IPortfolioAsset {
  '_id': string;
  'id': string;
  'SravzId': string;
  'Last': number;
  'Name': string;
  'Weight_Pct': number;
  'Weight_Price': number;
}

// Use this interface to save Portfolio Asset to server
export interface IPortfolioAssetSave {
    AssetId: string;
    SravzId: string;
    purchaseprice: number;
    quantity: number;
    weight: number;
    pnl: number;
    value: number;
    created: Date;
}

export interface IPortfolio {
  'name': string;
  'description': string;
  'ispublic': boolean;
  'cost': number;
  'value': number;
  'percent': number;
  'pnl': number;
  'created': Date;
  'portfolioassets': Array<IPortfolioAssetSave>;
}

