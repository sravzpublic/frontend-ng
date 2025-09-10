import { Injectable } from '@angular/core';
import { SettingsService } from '../common/settings.service';
import { HttpClient } from '@angular/common/http';
import { IAppConstant } from '../common/appconstant.model';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { catchError } from 'rxjs/operators';
import { IAlert } from './alert';

@Injectable()
export class AlertService {

    appConstants: IAppConstant;
    device: string;

    constructor(private http: HttpClient,
        private settingsService: SettingsService,
        private rxjsHelperService: RxjsHelperService) {
        this.appConstants = settingsService.getAppConstants();
    }

    getAlertsByUser() {
        return this.http.get<IAlert[]>(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/alertsbyuser`)
            .pipe(catchError(this.rxjsHelperService.handleError<IAlert[]>('getAlertsByUser', [])));
    }

    deleteAlert(alert: IAlert) {
        return this.http.delete(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/alerts`)
            .pipe(catchError(this.rxjsHelperService.handleError<IAlert[]>('deleteAlert', [])));
    }

    createAlert(alert: IAlert) {
        // Backend failes if the empty string ID is passed
        delete alert._id;
        return this.http.post(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/alerts`, alert)
            .pipe(catchError(this.rxjsHelperService.handleError<any>('createAlert', [])));
    }

    updateAlert(alert: IAlert) {
        return this.http.put(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/alerts`, alert)
            .pipe(catchError(this.rxjsHelperService.handleError<any>('updateAlert', [])));
    }

    crudAlert(alerts: IAlert[]) {
        // Backend failes if the empty string ID is passed
        alerts.filter(x => x.crudtype.toLocaleLowerCase() == 'insert').map(x => delete x._id);
        // console.log(alerts)
        return this.http.post(this.settingsService.getAppConstants().analyticsServiceBaseUri + `/api/alertscrud`, alerts)
            .pipe(catchError(this.rxjsHelperService.handleError<any>('crudAlert', [])));
    }

}
