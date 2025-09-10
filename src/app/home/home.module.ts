import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routes';

import { SharedModule } from '../shared/shared-module';
import { HomeResolver } from './home-resolver.service';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { USIndexQuoteResolver } from '../quotes/us-index-quotes-resolver.service';
import { QuoteService } from '../quotes/quotes.service';
import { CrudModule } from '../crud/crud.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),

    SharedModule,
    IgxDemoModule,
    CrudModule
  ],
  providers: [
    HomeResolver,
    USIndexQuoteResolver,
    QuoteService
  ]
})
export class HomeModule { }
