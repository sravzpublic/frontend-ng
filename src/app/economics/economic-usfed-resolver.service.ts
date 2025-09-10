import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { EconomicService } from './economic.service';

@Injectable()
export class USFedCalendarResolver  {
  constructor(private economicService: EconomicService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.economicService.getUsFedEvents();
  }
}
