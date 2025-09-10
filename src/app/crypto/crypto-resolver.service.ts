import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CryptoService } from './crypto.service';

@Injectable()
export class CryptoResolver  {
  constructor(private cryptoService: CryptoService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.cryptoService.getAssetsByType('Crypto');
  }
}
