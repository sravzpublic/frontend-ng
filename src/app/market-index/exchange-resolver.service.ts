import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { IndexService } from './index.service';

@Injectable()
export class ExchangeResolver  {
  constructor(private indexService: IndexService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.indexService.getAssetsByType('Exchange');
  }
}
