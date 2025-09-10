import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MutualFundsService } from './mutual-funds.service';


@Injectable()
export class MutualFundsResolver {
  constructor(private mutualFundsService: MutualFundsService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    const code = route.queryParams['code'];
    if (code) {
      return this.mutualFundsService.getMFBySravzID(code);
    }
  }
}
