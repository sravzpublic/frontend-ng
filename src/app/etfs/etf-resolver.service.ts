import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ETFService } from './etf.service';


@Injectable()
export class ETFResolver  {
  constructor(private etfsService: ETFService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    const code = route.queryParams['code'];
    if (code) {
      return this.etfsService.getETFByCode(code);
    }
  }
}
