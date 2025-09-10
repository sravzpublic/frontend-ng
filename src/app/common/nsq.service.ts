import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, concatMap, map } from 'rxjs/operators';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { environment } from '../../environments/environment';
import { IEodApiStatus, NSQStatus } from './nsq.model';
import { AWSSignedURL } from '../shared/models';


@Injectable()
export class NSQStatusService  {

  constructor(private http: HttpClient,
  private rxjsHelperService: RxjsHelperService) {}

  getNSQStatus(topic) {
    return this.http.get<NSQStatus>(`${environment.BACKEND_GO_URL}/api/nsq/${topic}`)
    .pipe(catchError(this.rxjsHelperService.handleError<NSQStatus>('getNSQStatus', null)));
  }

  getEodApiStatus() {
    return this.http.get<AWSSignedURL>(`${environment.BACKEND_GO_URL}/api/eodapistatus`)
      .pipe(
        concatMap((signedUrl) => {
          return this.http.get(signedUrl.URL).pipe(
            map((res: any) => res)).pipe(catchError(
              this.rxjsHelperService.handleError<IEodApiStatus[]>('getEodApiStatus', null)));
        }
        )
      );
  }

  getEodApiStatus2() {
    return this.http.get<AWSSignedURL>(`${environment.BACKEND_GO_URL}/api/eodapistatus2`)
      .pipe(
        concatMap((signedUrl) => {
          return this.http.get(signedUrl.URL).pipe(
            map((res: any) => res)).pipe(catchError(
              this.rxjsHelperService.handleError<IEodApiStatus[]>('getEodApiStatus2', null)));
        }
        )
      );
  }

}
