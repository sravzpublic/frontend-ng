import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AlertService } from './alert.service';



@Injectable()
export class AlertResolver  {
  constructor(private alertService: AlertService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.alertService.getAlertsByUser();
  }  
}
