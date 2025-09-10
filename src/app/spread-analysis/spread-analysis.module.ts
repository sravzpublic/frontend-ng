import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SpreadAnalysisRoutes } from './spread-analysis.routes';
import { AssetsService } from '../assets/assets.service';
import { AssetResolver } from '../assets/asset-resolver.service';
import { AssetTypeSelectorModule } from '../asset_type_selector/asset_type-selector.module';
import { AnalyticsService } from '../analytics.service';
import { CrudModule } from '../crud/crud.module';
import { CrudButtonsComponent } from '../crud/crud-buttons';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgniteUIService } from '../ignite-ui/services/ignite-ui-service';
import { SharedModule } from '../shared/shared-module';
import { IgxButtonModule, IgxDialogModule, IgxDropDownModule, IgxIconModule, IgxInputGroupModule, IgxRippleModule, IgxGridModule, IgxTabsModule } from '@infragistics/igniteui-angular';
import { SpreadAnalysisComponent } from './spread-analysis.component';
@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(SpreadAnalysisRoutes),
    AssetTypeSelectorModule,
    CrudModule,
    SharedModule,
    IgxDemoModule,
    IgxButtonModule,
    IgxDialogModule,
    IgxInputGroupModule,
    IgxRippleModule,
    IgxIconModule,
    IgxDropDownModule,
    IgxGridModule,
    IgxTabsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    SpreadAnalysisComponent
  ],
  providers: [
    AssetsService,
    AssetResolver,
    AnalyticsService,
    IgniteUIService
  ]
})
export class SpreadAnalysisModule { }
