import { Injectable } from '@angular/core';
import { SettingsService } from '../common/settings.service';
import { SocketPortfolio } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { IAppConstant } from '../common/appconstant.model';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { catchError, map } from 'rxjs/operators';
import { IEconomicEvent, IEvent, IUsFedCalendar } from './economic.model';
import { environment } from '../../environments/environment';


@Injectable()
export class EconomicService {

    appConstants: IAppConstant;
    device: string;

    constructor(private http: HttpClient,
        private settingsService: SettingsService,
        private rxjsHelperService: RxjsHelperService) {
        this.appConstants = settingsService.getAppConstants();
        this.device = this.settingsService.getAppSettings().isMobile ? 'mobile' : 'pc';
    }


    getMonday(d) {
        d = new Date(d);
        const day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    getFriday(d) {
        d = new Date(d);
        const day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1) + 5; // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    /* Yahoo, does not work anymore */
    getEvents(fromDate, toDate) {
        if (!fromDate) {
            fromDate = this.getMonday(new Date()).toISOString().substring(0, 10);
        }
        if (!toDate) {
            toDate = this.getFriday(new Date()).toISOString().substring(0, 10);
        }

        return this.http.get<IEvent[]>(
            `${this.settingsService.getAppConstants().portfolioServiceBaseUri}/ecocalByDateRange/${fromDate}/${toDate}`)
            .pipe(catchError(this.rxjsHelperService.handleError<IEvent[]>('getEvents', [])));
    }

    /* EOD Historical */
    getEconomicEvents(fromDate, toDate) {
        return this.http.get<IEconomicEvent[]>(this.settingsService.getAppConstants()
            .analyticsServiceBaseUri + `/api/economic_events/betweendates/${fromDate}/${toDate}`)
            .pipe(catchError(this.rxjsHelperService.handleError<IEconomicEvent[]>('getEconomicEvents', [])));
    }

    getUsFedEvents() {
        return this.http.get<IUsFedCalendar>(`https://usc1.contabostorage.com/adc59f4bb6a74373a1ebd286a7b11b60:sravz/${environment.CONTABO_BUCKET_NAME}/assets/calendar.json.gz`)
            .pipe(catchError(this.rxjsHelperService.handleError<IUsFedCalendar>('getUsFedEvents', null)));
    }

}
