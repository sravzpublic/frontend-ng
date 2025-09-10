import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { IndexRoutes } from './index.routes';
import { RouterModule } from '@angular/router';
import { IndexResolver } from './index-resolver.service';
import { IndexService } from './index.service';

import { CrudModule } from '../crud/crud.module';

import { SharedModule } from '../shared/shared-module';
import { ExchangeResolver } from './exchange-resolver.service';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { USIndexQuoteResolver } from '../quotes/us-index-quotes-resolver.service';
import { QuoteService } from '../quotes/quotes.service';

@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(IndexRoutes),


    CrudModule,
    SharedModule,
    IgxDemoModule
  ],
  providers: [
    IndexResolver,
    USIndexQuoteResolver,
    ExchangeResolver,
    IndexService,

    QuoteService
  ]
})
export class MarketIndexModule { }
