import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsRoutes } from './analytics.routes';
import { RouterModule } from '@angular/router';
import { AnalyticsResolver } from './analytics-resolver.service';

import { CrudButtonsComponent } from '../crud/crud-buttons';
import { CrudModule } from '../crud/crud.module';

import { SharedModule } from '../shared/shared-module';
import { AssetsService } from '../assets/assets.service';
import { AnalyticsService } from '../analytics.service';
import { UserAssetResolver } from '../assets/userasset-resolver.service';
import { PortfolioResolver } from '../portfolios/portfolio-resolver.service';
import { PortfolioService } from '../portfolios/portfolio.service';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';

@NgModule({
  declarations: [
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AnalyticsRoutes),

    IgxDemoModule,
    CrudModule,
    SharedModule
  ],
  providers: [
    AnalyticsResolver,
    PortfolioResolver,
    UserAssetResolver,
    AnalyticsService,
    AssetsService,
    PortfolioService
  ]
})
export class AnalyticsModule { }
