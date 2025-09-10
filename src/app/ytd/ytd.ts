export interface YTDCodes {
    name: string;
    data: string[];
}


export interface YTD {
    Code: string;
    Date_today: string;
    Open_today: number;
    High_today: number;
    Low_today: number;
    Close_today: number;
    Adjusted_close_today: number;
    Volume_today: number;
    Date_week_ago: string;
    Open_week_ago: number;
    High_week_ago: number;
    Low_week_ago: number;
    Close_week_ago: number;
    Adjusted_close_week_ago: number;
    Volume_week_ago: number;
    Date_three_months_ago: string;
    Open_three_months_ago: number;
    High_three_months_ago: number;
    Low_three_months_ago: number;
    Close_three_months_ago: number;
    Adjusted_close_three_months_ago: number;
    Volume_three_months_ago: number;
    Date_six_months_ago: string;
    Open_six_months_ago: number;
    High_six_months_ago: number;
    Low_six_months_ago: number;
    Close_six_months_ago: number;
    Adjusted_close_six_months_ago: number;
    Volume_six_months_ago: number;
    Date_year_start_date: string;
    Open_year_start_date: number;
    High_year_start_date: number;
    Low_year_start_date: number;
    Close_year_start_date: number;
    Adjusted_close_year_start_date: number;
    Volume_year_start_date: number;
    Date_one_year_ago: string;
    Open_one_year_ago: number;
    High_one_year_ago: number;
    Low_one_year_ago: number;
    Close_one_year_ago: number;
    Adjusted_close_one_year_ago: number;
    Volume_one_year_ago: number;
    Date_three_years_ago: string;
    Open_three_years_ago: number;
    High_three_years_ago: number;
    Low_three_years_ago: number;
    Close_three_years_ago: number;
    Adjusted_close_three_years_ago: number;
    Volume_three_years_ago: number;
    Date_five_years_ago: string;
    Open_five_years_ago: number;
    High_five_years_ago: number;
    Low_five_years_ago: number;
    Close_five_years_ago: number;
    Adjusted_close_five_years_ago: number;
    Volume_five_years_ago: number;
    Date_ten_years_ago: string;
    Open_ten_years_ago: number;
    High_ten_years_ago: number;
    Low_ten_years_ago: number;
    Close_ten_years_ago: number;
    Adjusted_close_ten_years_ago: number;
    Volume_ten_years_ago: number;
    Adjusted_close_week_ago_return_percent: number;
    Adjusted_close_three_months_ago_return_percent: number;
    Adjusted_close_six_months_ago_return_percent: number;
    Adjusted_close_year_start_date_return_percent: number;
    Adjusted_close_one_year_ago_return_percent: number;
    Adjusted_close_three_years_ago_return_percent: number;
    Adjusted_close_five_years_ago_return_percent: number;
    Adjusted_close_ten_years_ago_return_percent: number;
}

export interface QuoteStats {
    annual_return: string
    cumulative_returns: string
    annual_volatility: string
    sharpe_ratio: number
    calmar_ratio: number
    stability: number
    max_drawdown: string
    omega_ratio: number
    sortino_ratio: number
    skew: number
    kurtosis: number
    tail_ratio: number
    daily_value_at_risk: string
    alpha: number
    beta: number
    count: number
    mean: number
    std: number
    min: number
    "25_pct": number
    "50_pct": number
    "75_pct": number
    max: number
    start_date: string
    end_date: string
    sravz_id: string
  }
  
  export interface DbQueryResultItem {
    count: number;
    mean: number;
    std: number;
    min: number;
    '25_pct': number;
    '50_pct': number;
    '75_pct': number;
    max: number;
    percentage_over_max: number;
    percentage_over_min: number;
    percentage_over_mean: number;
    latest_price: number;
    earliest_price: number;
    earliest_timestamp: string; // ISO date string
    latest_timestamp: string;   // ISO date string
    sravz_id: string;
}

export interface DbQueryResultResponse {
    Bucket: string;
    DbQueryResult: DbQueryResultItem[];
    Key: string;
    WhereClause: string;
}