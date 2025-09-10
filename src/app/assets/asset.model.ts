export interface IAsset {
  'SravzId': string;
  'Name': string;
  'Commodity': string;
  'Country': string;
  'Symbol': string;
  'Exchange': string;
  'CNBCSymbol': string;
  'Month': string;
  'Type': string;
  'Created':  Date;
}

export interface IAssetGroups {
  'Assets': IAsset[];
  '_id': string;
}

export interface IExchangeAsset {
  'SravzId': string;
  'ExchangeSravzId': string;
  'Country': string;
  'Currency': string;
  'Code': string;
  'Exchange': string;
  'Name': string;
  'Type': string;
}

export interface IChartDataPoint {
  Date: Date;
  AdjustedClose: number;
  Close: number;
  High: number;
  Low: number;
  Open: number;
  Volume: number;
}

export interface IChartData {
  title: string;
  result: IChartDataPoint[];
}
