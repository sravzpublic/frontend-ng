import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { LeftClipper } from 'igniteui-angular-core';
import { environment } from '../../environments/environment';
import { EarningsService } from './earnings.service';

@Injectable()
export class EarningsResolver  {
  constructor(private earningsService: EarningsService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    const fromDate = new Date((new Date()).getTime() - (environment.rss_feeds_default_days * 24 * 60 * 60 * 1000));
    const toDate = new Date();
    return this.earningsService.getEarnings(fromDate, toDate);
  }
}
