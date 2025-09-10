import { Injectable } from '@angular/core';
import { SettingsService } from '../common/settings.service';
import { HttpClient } from '@angular/common/http';
import { IAppConstant } from '../common/appconstant.model';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ContactUSService {

    appConstants: IAppConstant;
    device: string;


    constructor(private http: HttpClient,
        private settingsService: SettingsService,
        private rxjsHelperService: RxjsHelperService) {
        this.appConstants = settingsService.getAppConstants();
        this.device = this.settingsService.getAppSettings().isMobile ? 'mobile' : 'pc';
    }

    sendMessage(contactMessage) {
        return this.http.post(this.settingsService.getAppConstants().analyticsServiceBaseUri + '/api/contactus', contactMessage)
            .pipe(catchError(this.rxjsHelperService.handleError<null>('sendMessage', null)));
    }

}
