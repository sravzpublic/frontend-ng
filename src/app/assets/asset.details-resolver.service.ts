import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AssetsService } from './assets.service';

@Injectable()
export class AssetDetailsResolver  {
  constructor(private assetService: AssetsService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.assetService.getAssetsByUser();
  }
}
