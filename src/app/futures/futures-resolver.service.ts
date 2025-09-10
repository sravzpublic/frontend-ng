import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { FuturesService } from './futures.service';


@Injectable()
export class FuturesResolver  {
  constructor(private futuresService: FuturesService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.futuresService.getFuturesStats();
  }
}
