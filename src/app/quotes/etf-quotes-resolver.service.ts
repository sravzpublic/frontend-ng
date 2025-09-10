import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { QuoteService } from './quotes.service';

@Injectable()
export class ETFQuoteResolver  {
  constructor(private quoteService: QuoteService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.quoteService.getETFQuotesS3URL();
  }
}
