import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ETFService } from './etf.service';


@Injectable()
export class ETFTickerResolver  {
  constructor(private etfsService: ETFService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
      return this.etfsService.getETFTickersS3URL();
  }
}
