import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssetRoutes } from './assets.routes';
import { AssetsService } from './assets.service';
import { AssetResolver } from './asset-resolver.service';
import { AssetListComponent } from './assets.list.component';
import { UserAssetResolver } from './userasset-resolver.service';
import { AssetTypeSelectorModule } from '../asset_type_selector/asset_type-selector.module';
import { AssetDetailsComponent } from './asset.details.component';
import { AssetDetailsResolver } from './asset.details-resolver.service';
import { AnalyticsService } from '../analytics.service';
import { UserAssetListComponent } from './user.assets.list.component';
import { AssetUploadComponent } from './assets.upload.component';
import { SravzAssetListComponent } from './sravz.assets.list.component';
import { SampleComponent } from './grid.sample';
import { CrudModule } from '../crud/crud.module';
import { AssetsComponent } from './assets.component';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgniteUIService } from '../ignite-ui/services/ignite-ui-service';
import { SharedModule } from '../shared/shared-module';
import { IgxButtonModule, IgxDialogModule, IgxDropDownModule, IgxIconModule, IgxInputGroupModule, IgxRippleModule, IgxTabsModule, IgxToastModule } from '@infragistics/igniteui-angular';
@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AssetRoutes),
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
    IgxTabsModule,
    IgxToastModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    AssetsComponent,
    AssetListComponent,
    AssetUploadComponent,
    AssetDetailsComponent,
    UserAssetListComponent,
    SravzAssetListComponent,
    SampleComponent
  ],
  providers: [
    AssetsService,
    AssetResolver,
    UserAssetResolver,
    AssetDetailsResolver,
    AnalyticsService,
    IgniteUIService
  ]
})
export class AssetModule { }
