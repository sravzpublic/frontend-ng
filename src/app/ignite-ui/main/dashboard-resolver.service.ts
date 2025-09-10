import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Injectable()
export class DashboardResolver  {
  constructor(private dashboardService: DashboardService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.dashboardService.getDashboardS3URL();
  }
}
