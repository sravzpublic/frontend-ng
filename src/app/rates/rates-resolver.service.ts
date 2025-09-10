import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RatesService } from './rates.service';

@Injectable()
export class RatesResolver  {
  constructor(private ratesService: RatesService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.ratesService.getAssetsByType('Rate');
  }
}
