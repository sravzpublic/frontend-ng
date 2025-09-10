import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MutualFundsService } from './mutual-funds.service';


@Injectable()
export class MutualFundsTickerResolver  {
  constructor(private mutualfundsService: MutualFundsService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
      return this.mutualfundsService.getMFTickers();
  }
}
