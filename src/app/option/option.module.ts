import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgxIconModule, IgxDateRangePickerModule, IgxDropDownModule,
  IgxRippleModule, IgxSelectModule, IgxToggleModule,
  IgxInputGroupModule } from '@infragistics/igniteui-angular';
import { FormsModule } from '@angular/forms';
import { OptionComponent } from './option-component';
import { OptionRoutes } from './option.routes';
import { OptionService } from './option.service';
import { FundamentalsService } from '../fundamentals/fundamental.service';
import { OptionTickerResolver } from './option-ticker-resolver.service';
import { OptionResolver } from './option-resolver.service';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [
    OptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(OptionRoutes),
    SharedModule,
    IgxDemoModule,
    IgxIconModule,
    FormsModule,
    IgxDateRangePickerModule,
    IgxSelectModule,
    IgxInputGroupModule,
    IgxDropDownModule,
    IgxRippleModule,
    IgxToggleModule
  ],
  providers: [
    OptionService,
    FundamentalsService,
    OptionTickerResolver,
    OptionResolver
  ]
})
export class OptionModule { }
