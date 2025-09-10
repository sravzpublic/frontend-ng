import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgxIconModule, IgxDateRangePickerModule, IgxSelectModule, IgxInputGroupModule } from '@infragistics/igniteui-angular';
import { FormsModule } from '@angular/forms';
import { MutualFundsComponent } from './mutual-funds-component';
import { MutualFundsRoutes } from './mutual-funds.routes';
import { MutualFundsService } from './mutual-funds.service';
import { MutualFundsTickerResolver } from './mutual-funds-ticker-resolver.service';
import { MutualFundsResolver } from './mutual-funds-resolver.service';
import { PipesModule } from '../pipe/pipes.module';



@NgModule({
  declarations: [
    MutualFundsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MutualFundsRoutes),
    IgxDemoModule,
    IgxIconModule,
    FormsModule,
    IgxDateRangePickerModule,
    FormsModule,
    IgxSelectModule,
    IgxInputGroupModule,
    PipesModule,
  ],
  providers: [
    MutualFundsService,
    MutualFundsResolver,
    MutualFundsTickerResolver
  ]
})
export class MutualFundsModule { }
