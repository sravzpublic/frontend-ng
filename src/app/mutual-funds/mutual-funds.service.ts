import { Injectable } from '@angular/core';

import { map, catchError, concatMap } from 'rxjs/operators';
import { SettingsService } from '../common/settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { IFundamental, IMFTicker } from './mutual-funds';
import { AWSSignedURL } from '../shared/models';


@Injectable()
export class MutualFundsService {

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService,
    private rxjsHelperService: RxjsHelperService
  ) { }


  // Using the api to get fundamentals for MF
  getMFByCode(code: String) {
    return this.http.get<IFundamental>(this.settingsService.getAppConstants()
      .analyticsServiceBaseUri + `/api/etfs/bycode/${code}`)
      .pipe(catchError(this.rxjsHelperService.handleError<IFundamental>('getETFByCode', null)));
  }

  getMFBySravzID(sravID: String) {
    return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants().quotesServiceBaseUri + `/fundamentals?sravzid=${sravID}`)
      .pipe(
        concatMap((signedUrl) => {
          return this.http.get(signedUrl.URL).pipe(catchError(this.rxjsHelperService.handleError<IFundamental>('getMFBySravzID', null)));
        }
        )
      );
  }

  // TODO: hard coded NMFQS
  getMFTickers() {
    return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/allsymbolsinanexchange/NMFQS`)
      .pipe(
        concatMap((signedUrl) => {
          return this.http.get(signedUrl.URL).pipe(catchError(this.rxjsHelperService.handleError<IMFTicker[]>('getMFTickers', null)));
        }
        )
      );
  }
}
