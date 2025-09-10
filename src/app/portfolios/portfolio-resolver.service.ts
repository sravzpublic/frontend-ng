import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { PortfolioService } from './portfolio.service';

@Injectable()
export class PortfolioResolver  {
  constructor(private portfolioService: PortfolioService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.portfolioService.getAllPortfolios();
  }
}
