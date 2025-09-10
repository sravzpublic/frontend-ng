import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, concatMap } from 'rxjs/operators';
import { IDashboard, IDashboardAPI } from './dashboard.model';
import { RxjsHelperService } from '../../common/rxjs.helper.service';
import { AWSSignedURL } from '../../shared/models';
import { environment } from '../../../environments/environment';
@Injectable()
export class DashboardService {
    constructor(private http: HttpClient,
        private rxjsHelperService: RxjsHelperService) {
    }
    getDashboardS3URL() {
        return this.http.get<AWSSignedURL>(environment.BACKEND_GO_URL + `/api/dashboard`)
            .pipe(
                concatMap((signedUrl) => {
                    return this.http.get(signedUrl.URL).pipe(
                        map((res) => res)).pipe(catchError(
                            this.rxjsHelperService.handleError<IDashboardAPI>('getDashboardS3URL', null)));
                }
                )
            );
    }
}
