import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { EconomicService } from './economic.service';

@Injectable()
export class CalendarResolver  {
  constructor(private economicService: EconomicService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.economicService.getEconomicEvents(this.economicService.getMonday(new Date()).toISOString().substring(0, 10),
    this.economicService.getFriday(new Date()).toISOString().substring(0, 10));
  }
}
