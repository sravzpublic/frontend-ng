import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AssetsService } from '../assets/assets.service';

@Injectable()
export class AnalyticsResolver  {
  constructor(private assetsService: AssetsService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.assetsService.getAllAssetsS3Url();
  }
}
