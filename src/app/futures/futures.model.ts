export interface IFutureStat {
    count: number
    mean: number
    std: number
    min: number
    "25%": number
    "50%": number
    "75%": number
    max: number
    SravzId: string
    FromDate: string
    ToDate: string
    AdjustedClose: number
    AdjustedCloseVsMaxPercent: number
    AdjustedCloseVsMeanPercent: number
    AdjustedCloseVsMinPercent: number
    Name: string
  }
