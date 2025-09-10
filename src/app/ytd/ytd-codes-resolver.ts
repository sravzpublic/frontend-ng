import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { FundamentalsService } from '../fundamentals/fundamental.service';


@Injectable()
export class YTDCodesResolver  {
  constructor(private fundamentalsService: FundamentalsService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.fundamentalsService.getYTDCodesS3URL();
  }
}
