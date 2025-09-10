import { Injectable } from '@angular/core';
import { catchError, concatMap, map } from 'rxjs/operators';
import { SettingsService } from '../common/settings.service';
import { HttpClient } from '@angular/common/http';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { IBond, IBondTicker } from './bond';
import { AWSSignedURL } from '../shared/models';

@Injectable()
export class BondService {

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService,
    private rxjsHelperService: RxjsHelperService
  ) { }

  getBondTickers() {
    return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants()
      .analyticsServiceBaseUri + `/api/bonds`)
      .pipe(
        concatMap((signedUrl) => {
          return this.http.get(signedUrl.URL).pipe(catchError(
              this.rxjsHelperService.handleError<IBond[]>('getBondTickers', null)));
        }
        )
      );
  }

  getBondByCodeS3URL(code: String) {
    return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/fundamentals-bond/bycodeS3url/${code}`)
      .pipe(
        concatMap((signedUrl) => {
          return this.http.get(signedUrl.URL).pipe(catchError(
              this.rxjsHelperService.handleError<IBondTicker[]>('getBondByCodeS3URL', null)));
        }
        )
      );
  }

}
