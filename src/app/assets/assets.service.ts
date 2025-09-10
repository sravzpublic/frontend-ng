import { Injectable } from '@angular/core';
import { SettingsService } from '../common/settings.service';
import { SocketPortfolio } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { IAppConstant } from '../common/appconstant.model';
import { IAsset, IAssetGroups } from './asset.model';
import { RxjsHelperService } from '../common/rxjs.helper.service';
import { catchError, concatMap, map } from 'rxjs/operators';
import { IUserAsset } from './userasset.model';
import { IAssetType } from './assettype.model';
import { AWSSignedURL } from '../shared/models';

@Injectable()
export class AssetsService {

    appConstants: IAppConstant;
    device: string;

    constructor(private http: HttpClient,
        private settingsService: SettingsService,
        private socketService: SocketPortfolio,
        private rxjsHelperService: RxjsHelperService) {
        this.appConstants = settingsService.getAppConstants();
        this.device = this.settingsService.getAppSettings().isMobile ? 'mobile' : 'pc';
    }

    getAllAssetsS3Url() {
        return this.http.get<AWSSignedURL>(this.settingsService.getAppConstants().analyticsServiceBaseUri + '/api/assetsbytypes3url/all')
            .pipe(
                concatMap((signedUrl) => {
                    return this.http.get(signedUrl.URL).pipe(catchError(
                            this.rxjsHelperService.handleError<IAsset[]>('getAllAssetsS3Url', null)));
                }
                )
            );
    }

    getAllAssets() {
        return this.http.get<IAsset[]>(this.settingsService.getAppConstants().portfolioServiceBaseUri + '/assets')
            .pipe(catchError(this.rxjsHelperService.handleError<IAsset[]>('getAssets', [])));
    }

    getAssetGroups() {
        return this.http.get<IAsset[]>(this.settingsService.getAppConstants().portfolioServiceBaseUri + '/assetsbytype')
            .pipe(catchError(this.rxjsHelperService.handleError<IAssetGroups[]>('getAssetGroups', [])));
    }

    getAssetsByUser() {
        return this.http.get<IUserAsset[]>(this.settingsService.getAppConstants().portfolioServiceBaseUri + '/userassets')
            .pipe(catchError(this.rxjsHelperService.handleError<IUserAsset[]>('getUserAssets', [])));
    }

    updateAssetsByUser(asset) {
        return this.http.post(this.settingsService.getAppConstants().portfolioServiceBaseUri + '/userassets', asset)
            .pipe(catchError(this.rxjsHelperService.handleError<IUserAsset[]>('deleteAssetsByUser', [])));
    }

    deleteAssetsByUser(user_asset_name) {
        return this.http.delete(this.settingsService.getAppConstants().portfolioServiceBaseUri + '/userassets/' + user_asset_name)
            .pipe(catchError(this.rxjsHelperService.handleError<IUserAsset[]>('deleteAssetsByUser', [])));
    }

    getAssetsTypes() {
        return this.http.get<IAssetType[]>(this.settingsService.getAppConstants().analyticsServiceBaseUri + '/api/userassets')
            .pipe(catchError(this.rxjsHelperService.handleError<IAssetType[]>('getUserAssets', [])));
    }

    getAssetDetails() {
        return this.http.get<IAssetType[]>(this.settingsService.getAppConstants().analyticsServiceBaseUri + '/api/userassets')
            .pipe(catchError(this.rxjsHelperService.handleError<IAssetType[]>('getUserAssets', [])));
    }

    getHistoricalPrice(asset) {
        return this.http.get(this.appConstants.portfolioServiceBaseUri + '/quotes/sravzid/' + asset + '/' + this.device,
        ).subscribe((results) => {
            return results;
        });
    }

    getHistoricalPrices(assets) {
        const promises = [];
        assets.forEach((asset) => { promises.push(this.getHistoricalPrice(asset)); });
        return promises;
    }

    getHistoricalPricesSocket(assets) {
        this.socketService.emit('combinedchart', JSON.stringify(
            {
                'args': [assets],
                'messageid': 9, // ombined chart data
                'device': 'mobile'
            }));
    }

    getDataFromURL(url) {
        return this.http.get(url).subscribe((results) => {
            return results['data'];
        });
    }
}
