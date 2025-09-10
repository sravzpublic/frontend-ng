import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssetTypeSelectorModule } from '../asset_type_selector/asset_type-selector.module';
import { AnalyticsService } from '../analytics.service';
import { PortfolioRoutes } from './portfolio.routes';
import { PortfolioService } from './portfolio.service';
import { PortfolioResolver } from './portfolio-resolver.service';
import { PortfolioListComponent } from './portfolio.list.component';
import { CrudModule } from '../crud/crud.module';
import { SharedModule } from '../shared/shared-module';
import { PortfolioCreateComponent } from './portfolio.create.component';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgxTabsModule } from '@infragistics/igniteui-angular';
import { IgxButtonModule, IgxDialogModule, IgxDropDownModule, IgxIconModule, IgxInputGroupModule, IgxRippleModule } from '@infragistics/igniteui-angular';
@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PortfolioRoutes),
    AssetTypeSelectorModule,
    CrudModule,
    SharedModule,
    IgxDemoModule,
    IgxTabsModule,
    IgxButtonModule,
    IgxDialogModule,
    IgxInputGroupModule,
    IgxRippleModule,
    IgxIconModule,
    IgxDropDownModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    PortfolioListComponent,
    PortfolioCreateComponent
  ],
  providers: [
    PortfolioService,
    PortfolioResolver,
    AnalyticsService,

    DatePipe,
  ]
})
export class PortfolioModule { }
