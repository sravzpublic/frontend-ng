import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { FundamentalsService } from '../fundamentals/fundamental.service';


@Injectable()
export class InsiderTradingResolver  {
  constructor(private fundamentalsService: FundamentalsService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.fundamentalsService.getInsiderTradingS3URL();
  }
}
