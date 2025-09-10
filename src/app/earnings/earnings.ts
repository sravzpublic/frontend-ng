export interface IEarnings {
    code: string;
    date: string;
    report_date: string;
    actual: number;
    estimate: number;
    difference: number;
    percent: number;
}

export interface IEarningDetails {
  _id: string;
  datetime: Date;
  description: string;
  earnings: IEarnings[];
  symbols: string;
  type: string;
}
