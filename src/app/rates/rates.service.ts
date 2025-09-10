import { Injectable } from '@angular/core';
import { SettingsService } from '../common/settings.service';
import { HttpClient } from '@angular/common/http';
import { IAppConstant } from '../common/appconstant.model';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { catchError } from 'rxjs/operators';
import { IAsset } from '../assets/asset.model';

@Injectable()
export class RatesService {

    appConstants: IAppConstant;
    device: string;

    constructor(private http: HttpClient,
        private settingsService: SettingsService,
        private rxjsHelperService: RxjsHelperService) {
        this.appConstants = settingsService.getAppConstants();
        this.device = this.settingsService.getAppSettings().isMobile ? 'mobile' : 'pc';
    }


    getAssetsByType(type) {
        return this.http.get<IAsset[]>(this.settingsService.getAppConstants().analyticsServiceBaseUri + '/api/assetsbytype/' + type)
        .pipe(catchError(this.rxjsHelperService.handleError<IAsset[]>('getAssets', [])));
    }

    getMortgageQuotes() {
        return this.http.get<IAsset[]>(this.settingsService.getAppConstants().analyticsServiceBaseUri + '/api/mortgagequotes')
        .pipe(catchError(this.rxjsHelperService.handleError<IAsset[]>('getMortgageQuotes', [])));
    }

}
