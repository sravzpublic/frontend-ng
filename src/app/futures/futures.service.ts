import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConstant } from '../common/appconstant.model';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { catchError } from 'rxjs/operators';
import { IFutureStat } from './futures.model';
import { environment } from '../../environments/environment';

@Injectable()
export class FuturesService {

    appConstants: IAppConstant;
    device: string;

    constructor(private http: HttpClient, private rxjsHelperService: RxjsHelperService) {
    }

    getFuturesStats() {
        return this.http.get<IFutureStat[]>(`https://usc1.contabostorage.com/adc59f4bb6a74373a1ebd286a7b11b60:sravz/${environment.CONTABO_BUCKET_NAME}/price_stats/all.json`)
            .pipe(catchError(this.rxjsHelperService.handleError<IFutureStat>('getFuturesStats', null)));
    }

}
