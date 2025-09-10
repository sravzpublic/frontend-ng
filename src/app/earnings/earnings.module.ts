import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgxIconModule, IgxDateRangePickerModule, IgxSelectModule, IgxInputGroupModule, IgxTabsModule } from '@infragistics/igniteui-angular';
import { FormsModule } from '@angular/forms';
import { EarningsComponent } from './earnings-component';
import { EarningsService } from './earnings.service';
import { EarningsResolver } from './earnings-resolver.service';
import { EarningsRoutes } from './earnings.routes';
import { EarningsDetailsComponent } from './earnings-details-component';
import { EarningsDetailsResolver } from './earnings-details-resolver.service';
import { AssetsService } from '../assets/assets.service';
import { AssetResolver } from '../assets/asset-resolver.service';


@NgModule({
  declarations: [
    EarningsComponent,
    EarningsDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EarningsRoutes),
    IgxDemoModule,
    IgxIconModule,
    FormsModule,
    IgxDateRangePickerModule,
    FormsModule,
    IgxSelectModule,
    IgxInputGroupModule,
    IgxTabsModule
  ],
  providers: [
    EarningsService,
    EarningsResolver,
    EarningsDetailsResolver,
    AssetsService,
    AssetResolver,
  ]
})
export class EarningsModule { }
