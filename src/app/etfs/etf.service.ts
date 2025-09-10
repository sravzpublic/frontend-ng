import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError, concatMap } from 'rxjs/operators';
import { SettingsService } from '../common/settings.service';
import { HttpClient } from '@angular/common/http';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { IFundamental, IETFTicker } from './etf';
import { AWSSignedURL } from '../shared/models';

@Injectable()
export class ETFService {

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService,
    private rxjsHelperService: RxjsHelperService
  ) { }


  getETFByCode(code: String) {
    return this.http.get<IFundamental>(this.settingsService.getAppConstants()
      .analyticsServiceBaseUri + `/api/etfs/bycode/${code}`)
      .pipe(catchError(this.rxjsHelperService.handleError<IFundamental>('getETFByCode', null)));
  }

  getETFTickers() {
    return this.http.get<IETFTicker>(this.settingsService.getAppConstants()
      .analyticsServiceBaseUri + `/api/etfs`)
      .pipe(catchError(this.rxjsHelperService.handleError<IFundamental>('getETFTickers', null)));
  }

  getETFTickersS3URL() {
    return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/tickersbytype/ETF`)
      .pipe(
        concatMap((signedUrl) => {
          return this.http.get(signedUrl.URL).pipe(catchError(
              this.rxjsHelperService.handleError<IETFTicker[]>('getETFTickersS3URL', null)));
        }
        )
      );
  }
}
