import { Injectable } from '@angular/core';

import { map, catchError, concatMap } from 'rxjs/operators';
import { SettingsService } from '../common/settings.service';
import { HttpClient } from '@angular/common/http';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { IFundamental, IStockTicker } from './fundamental';
import { AWSSignedURL } from '../shared/models';
import { DbQueryResultResponse, QuoteStats, YTD, YTDCodes } from '../ytd/ytd';

@Injectable()
export class FundamentalsService {

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService,
    private rxjsHelperService: RxjsHelperService
  ) { }

  // Depricated
  getFundamentalsByCode(code: String) {
    return this.http.get<IFundamental>(this.settingsService.getAppConstants()
      .analyticsServiceBaseUri + `/api/fundamentals/bycode/${code}`)
      .pipe(catchError(this.rxjsHelperService.handleError<IFundamental>('getfundamentalsByCode', null)));
  }

  getStockTickers() {
    return this.http.get<IStockTicker>(this.settingsService.getAppConstants()
      .analyticsServiceBaseUri + `/api/stockquotes`)
      .pipe(catchError(this.rxjsHelperService.handleError<IFundamental>('getStockTickers', null)));
  }

  getFundamentalsByCodeS3URL(code: String) {
    return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/fundamentals/bycodeS3url/${code}`)
      .pipe(
        concatMap((signedUrl) => {
          return this.http.get(signedUrl.URL).pipe(catchError(
            this.rxjsHelperService.handleError<IFundamental[]>('getFundamentalsByCodeS3URL', null)));
        }
        )
      );
  }

  getInsiderTradingS3URL() {
    return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/insidertransactions/s3url`)
      .pipe(
        concatMap((signedUrl) => {
          return this.http.get(signedUrl.URL).pipe(catchError(
            this.rxjsHelperService.handleError<IFundamental[]>('getInsiderTradingS3URL', null)));
        }
        )
      );
  }

  getYTDCodesS3URL() {
    return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/getallytdcodess3URL`)
      .pipe(
        concatMap((signedUrl) => {
          return this.http.get(signedUrl.URL).pipe(catchError(
            this.rxjsHelperService.handleError<YTDCodes>('getYTDCodesS3URL', null)));
        }
        )
      );
  }

  getYTDS3URL(codes) {
    return this.http.get<YTD[]>(this.settingsService.getAppConstants()
      .analyticsServiceBaseUri + `/api/ytdbycode/${codes}`)
      .pipe(catchError(this.rxjsHelperService.handleError<YTD[]>('getYTDS3URL', null)));
  }

  //http://localhost:5000/s3?bucket=sravz-data&key=historical/quotes_stats.parquet&column=sravz_id&in_clause=stk_us_extr,stk_us_goog,stk_us_amd
  getQuotesStats(codes) {
    return this.http.get<QuoteStats[]>(this.settingsService.getAppConstants()
      .quotesServiceBaseUri + `/s3?bucket=sravz-data&key=historical/quotes_stats.parquet&column=sravz_id&in_clause=${codes}`)
      .pipe(catchError(this.rxjsHelperService.handleError<QuoteStats[]>('getQuotesStats', null)));
  }

  // https://quotes.sravz.com/duckdb?bucket=sravz&key=sravz-production/price_stats/quotes_stats_latest.parquet&where_clause=sravz_id+in+('stk_us_nvda',+'stk_us_msft')
  getQuotesStatsLatest(codes) {
    return this.http.get<DbQueryResultResponse>(this.settingsService.getAppConstants()
      .quotesServiceBaseUri + `/duckdb?bucket=sravz-data&key=historical/quotes_summary_stats.parquet&where_clause=sravz_id in (${codes})`)
      .pipe(catchError(this.rxjsHelperService.handleError<DbQueryResultResponse>('getQuotesStatsLatest', null)));
  }

}
