import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { OptionService } from './option.service';


@Injectable()
export class OptionTickerResolver  {
  constructor(private optionService: OptionService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
      return this.optionService.getOptionTickers();
  }
}
