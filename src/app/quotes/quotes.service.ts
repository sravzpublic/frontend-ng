import { Injectable } from '@angular/core';
import { SettingsService } from '../common/settings.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAppConstant } from '../common/appconstant.model';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { map, catchError, concatMap } from 'rxjs/operators';
import { IQuote } from './quotes.model';
import { IPortfolio } from '../portfolios/portfolio.model';
import { throwError } from 'rxjs';
import { AWSSignedURL } from '../shared/models';

@Injectable()
export class QuoteService {

    appConstants: IAppConstant;
    device: string;

    constructor(private http: HttpClient,
        private settingsService: SettingsService,
        private rxjsHelperService: RxjsHelperService) {
        this.appConstants = settingsService.getAppConstants();
        this.device = this.settingsService.getAppSettings().isMobile ? 'mobile' : 'pc';
    }


    getAllQuotes() {
        return this.http.get<IQuote[]>(this.settingsService.getAppConstants().portfolioServiceBaseUri + '/api/futurequotes')
            .pipe(catchError(this.rxjsHelperService.handleError<IQuote[]>('getAllQuotes', [])));
    }

    getIndexQuotes() {
        return this.http.get<IQuote[]>(this.settingsService.getAppConstants().analyticsServiceBaseUri + '/api/indexquotes')
            .pipe(catchError(this.rxjsHelperService.handleError<IQuote[]>('getIndexQuotes', [])));
    }


    getIndexQuotesS3URL() {
        return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/indexquotess3url`)
            .pipe(
                concatMap((signedUrl) => {
                    return this.http.get(signedUrl.URL).pipe(catchError(
                            this.rxjsHelperService.handleError<IQuote[]>('getIndexQuotesS3URL', null)));
                }
                )
            );
    }

    getFutureQuotesS3URL() {
        return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/futurequotes3url`)
            .pipe(
                concatMap((signedUrl) => {
                    return this.http.get(signedUrl.URL).pipe(catchError(
                            this.rxjsHelperService.handleError<IQuote[]>('getFutureQuotesS3URL', null)));
                }
                )
            );
    }

    getETFQuotesS3URL() {
        return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/etfquotes3url`)
            .pipe(
                concatMap((signedUrl) => {
                    return this.http.get(signedUrl.URL).pipe(catchError(
                            this.rxjsHelperService.handleError<IQuote[]>('getETFQuotesS3URL', null)));
                }
                )
            );
    }

    getCurrencyQuotes() {
        return this.http.get<IQuote[]>(this.settingsService.getAppConstants().analyticsServiceBaseUri + '/api/currencyquotes')
            .pipe(catchError(this.rxjsHelperService.handleError<IQuote[]>('getCurrencyQuotes', [])));
    }

    getRatesQuotes() {
        return this.http.get<IQuote[]>(this.settingsService.getAppConstants().analyticsServiceBaseUri + '/api/ratesquotes')
            .pipe(catchError(this.rxjsHelperService.handleError<IQuote[]>('getRatesQuotes', [])));
    }

    getCryptoQuotes() {
        return this.http.get<IQuote[]>(this.settingsService.getAppConstants().analyticsServiceBaseUri + '/api/cryptoquotes')
            .pipe(catchError(this.rxjsHelperService.handleError<IQuote[]>('getCryptoQuotes', [])));
    }

    getETFQuotes() {
        return this.http.get<IQuote[]>(this.settingsService.getAppConstants().analyticsServiceBaseUri + '/api/etfquotes')
            .pipe(catchError(this.rxjsHelperService.handleError<IQuote[]>('getETFQuotes', [])));
    }


    getVixQuotes() {
        return this.http.get<IQuote[]>(this.settingsService.getAppConstants().analyticsServiceBaseUri + '/api/vixquotes')
            .pipe(catchError(this.rxjsHelperService.handleError<IQuote[]>('getVixQuotes', [])));
    }

    getStockQuotesByTickerStartLetter(commaSeparatedStartLetters) {
        return this.http.get<IQuote[]>(this.settingsService.getAppConstants().
            portfolioServiceBaseUri + '/quotes/stockquotesbytickerstartletter/' + commaSeparatedStartLetters)
            .pipe(catchError(this.rxjsHelperService.handleError<IQuote[]>('getAllQuotes', [])));
    }

    createPortfolio(portfolio) {
        return this.http.post(this.settingsService.getAppConstants().portfolioServiceBaseUri + '/portfolios', portfolio)
            .pipe(catchError(this.rxjsHelperService.handleError<any>('createPortfolio', [])));
    }


}
