export interface IPortfolioRaw {
  '_id': string;
  'name': string;
  description: string;
  'cost': number;
  'value': number;
  'percent': number;
  'pnl': number;
  'ispublic': boolean;
  'portfolioassets': IPortfolioAssetRaw[];
  'created': Date;
  'pnlcalculationdt': Date;
}

export interface IPortfolioAssetRaw {
  'id': string;
  'purchaseprice': number;
  'value': number;
  'pnl': number;
  'quantity': number;
  'weight': number;
  'AssetId': string;
  'created': Date;
  'asset': string;
  'pnlcalculationdt': Date;
  SravzId: string;
  chg: number;
  Chg_Pct: string;
  Commodity: string;
  High: string;
  Last: number;
  Low: string;
  Month: string;
  Time: Date;
  Country: string;
  _id: string;
  CNBCSymbol: string;
  Chg: string;
  Exchange: string;
  Name: string;
  Open: string;
  Weight_Pct: number;
  Weight_Price: number;
}



export interface IPortfolio {
  '_id': string;
  'name': string;
  'cost': number;
  'value': number;
  'pnl': number;
  'ispublic': boolean;
  'portfolioassets': IPortfolioAsset[];
  'created': Date;
  'pnlcalculationdt': Date;
}

export interface IPortfolioAsset {
  '_id': string;
  'purchaseprice': number;
  'value': number;
  'pnl': number;
  'quantity': number;
  'weight': number;
  'AssetId': string;
  'SravzId': string;
  'created': Date;
  'asset': string;
  'pnlcalculationdt': Date;
}

export interface IPortfolioBulk {
  'name': string;
  'description': string;
  'sravzids': string;
}
