import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { LeftClipper } from 'igniteui-angular-core';
import { environment } from '../../environments/environment';
import { EarningsService } from './earnings.service';
import { IEarningDetails } from './earnings';

@Injectable()
export class EarningsDetailsResolver  {
  constructor(private earningsService: EarningsService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    const code = route.queryParams['code'];
    if (code) {
      return this.earningsService.getEarningsByCode(code);
    }
    return null;
  }
}
