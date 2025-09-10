import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgxIconModule, IgxDateRangePickerModule, IgxSelectModule, IgxInputGroupModule } from '@infragistics/igniteui-angular';
import { FormsModule } from '@angular/forms';
import { FundamentalsComponent } from './fundamental-component';
import { FundamentalsRoutes } from './fundamental.routes';
import { FundamentalsService } from './fundamental.service';
import { FundamentalsResolver } from './fundamental-resolver.service';
import { StockTickerResolver } from './stocks-ticker-resolver.service';



@NgModule({
  declarations: [
    FundamentalsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FundamentalsRoutes),
    IgxDemoModule,
    IgxIconModule,
    FormsModule,
    IgxDateRangePickerModule,
    FormsModule,
    IgxSelectModule,
    IgxInputGroupModule,
  ],
  providers: [
    FundamentalsService,
    FundamentalsResolver,
    StockTickerResolver
  ]
})
export class FundamentalsModule { }
