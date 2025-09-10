export interface IInsiderTrade {
    code: string;
    exchange: string;
    date: string;
    reportDate?: any;
    ownerCik?: any;
    ownerName: string;
    ownerRelationship?: any;
    ownerTitle: string;
    transactionDate: string;
    transactionCode: string;
    transactionAmount: number;
    transactionPrice: number;
    transactionAcquiredDisposed: string;
    postTransactionAmount?: any;
    link: string;
}

