import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { OptionService } from './option.service';



@Injectable()
export class OptionResolver  {
  constructor(private optionService: OptionService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    const code = route.queryParams['code'];
    if (code) {
      return this.optionService.getOptionByCodeS3URL(code);
    }
  }
}
