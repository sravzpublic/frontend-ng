import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { LeftClipper } from 'igniteui-angular-core';
import { environment } from '../../environments/environment';
import { FundamentalsService } from './fundamental.service';


@Injectable()
export class FundamentalsResolver  {
  constructor(private fundamentalsService: FundamentalsService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    const code = route.queryParams['code'];
    if (code) {
      return this.fundamentalsService.getFundamentalsByCodeS3URL(code);
    }
  }
}
