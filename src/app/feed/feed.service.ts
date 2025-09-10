import { Injectable } from '@angular/core';

import { Feed, IRSSFeedEntry } from './feed';
import { Observable, throwError } from 'rxjs';
import { map, catchError, concatMap } from 'rxjs/operators';
import { SettingsService } from '../common/settings.service';
import { HttpClient } from '@angular/common/http';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { AWSSignedURL } from '../shared/models';

@Injectable()
export class FeedService {

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService,
    private rxjsHelperService: RxjsHelperService
  ) { }

  getRSSFeedEntries(fromDate: Date, toDate: Date) {
    return this.http.get<IRSSFeedEntry[]>(this.settingsService.getAppConstants()
      .analyticsServiceBaseUri + `/api/feeds/betweendates/${fromDate.toDateString()}/${toDate.toDateString()}`)
      .pipe(catchError(this.rxjsHelperService.handleError<IRSSFeedEntry[]>('getRSSFeedEntries', [])));
  }

  getRSSFeedEntriesS3Url(fromDate: Date, toDate: Date) {
    return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/feeds/betweendatess3url/${fromDate.toDateString()}/${toDate.toDateString()}`)
      .pipe(
        concatMap((signedUrl) => {
          return this.http.get(signedUrl.URL).pipe(
            map((res: IRSSFeedEntry[]) => res)).pipe(catchError(
              this.rxjsHelperService.handleError<IRSSFeedEntry[]>('getRSSFeedEntriesS3Url', null)));
        }
        )
      );
  }

}
