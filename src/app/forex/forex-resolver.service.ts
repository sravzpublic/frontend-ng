import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ForexService } from './forex.service';

@Injectable()
export class ForexResolver  {
  constructor(private forexService: ForexService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.forexService.getAssetsByType('Forex');
  }
}
