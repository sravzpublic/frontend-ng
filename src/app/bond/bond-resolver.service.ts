import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BondService } from './bond.service';



@Injectable()
export class BondResolver  {
  constructor(private bondService: BondService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    const code = route.queryParams['code'];
    if (code) {
      return this.bondService.getBondByCodeS3URL(code);
    }
  }
}
