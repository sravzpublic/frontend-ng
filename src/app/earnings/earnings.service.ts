import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SettingsService } from '../common/settings.service';
import { HttpClient } from '@angular/common/http';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { IEarnings, IEarningDetails } from './earnings';

@Injectable()
export class EarningsService {

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService,
    private rxjsHelperService: RxjsHelperService
  ) { }

  getEarnings(fromDate: Date, toDate: Date) {
    return this.http.get<IEarnings[]>(this.settingsService.getAppConstants()
      .analyticsServiceBaseUri + `/api/earnings/betweendates/${fromDate.toDateString()}/${toDate.toDateString()}`)
      .pipe(catchError(this.rxjsHelperService.handleError<IEarnings[]>('getEArnings', [])));
  }

  getEarningsByCode(code: String) {
    return this.http.get<IEarningDetails>(this.settingsService.getAppConstants()
      .analyticsServiceBaseUri + `/api/earnings/bycode/${code}`)
      .pipe(catchError(this.rxjsHelperService.handleError<IEarningDetails>('getEarningsByCode', null)));
  }
}
