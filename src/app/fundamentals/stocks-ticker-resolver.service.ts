import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { FundamentalsService } from './fundamental.service';


@Injectable()
export class StockTickerResolver  {
  constructor(private fundamentalsService: FundamentalsService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
      return this.fundamentalsService.getStockTickers();
  }
}
