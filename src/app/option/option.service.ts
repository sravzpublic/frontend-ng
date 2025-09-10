import { Injectable } from '@angular/core';
import { catchError, concatMap, map } from 'rxjs/operators';
import { SettingsService } from '../common/settings.service';
import { HttpClient } from '@angular/common/http';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { AWSSignedURL } from '../shared/models';

import { IOptionTicker, OptionAsset } from './option';

@Injectable()
export class OptionService {

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService,
    private rxjsHelperService: RxjsHelperService,
  ) { }

  getOptionTickers() {
    return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants()
      .analyticsServiceBaseUri + `/api/assetsbytypes3url/option`)
      .pipe(
        concatMap((signedUrl) => {
          return this.http.get(signedUrl.URL).pipe(catchError(
              this.rxjsHelperService.handleError<IOptionTicker[]>('getOptionTickers', null)));
        }
        )
      );
  }

  getOptionByCodeS3URL(code: String) {
    return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/fundamentals-option/bycodeS3url/${code}`)
      .pipe(
        concatMap((signedUrl) => {
          return this.http.get(signedUrl.URL).pipe(catchError(
              this.rxjsHelperService.handleError<OptionAsset>('getOptionByCodeS3URL', null)));
        }
        )
      );
  }

}
