import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BondService } from './bond.service';


@Injectable()
export class BondTickerResolver  {
  constructor(private bondService: BondService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
      return this.bondService.getBondTickers();
  }
}
