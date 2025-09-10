import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgxIconModule, IgxDateRangePickerModule, IgxSelectModule, IgxInputGroupModule } from '@infragistics/igniteui-angular';
import { FormsModule } from '@angular/forms';
import { BondComponent } from './bond-component';
import { BondRoutes } from './bond.routes';
import { BondService } from './bond.service';
import { BondResolver } from './bond-resolver.service';
import { BondTickerResolver } from './bond-ticker-resolver.service';



@NgModule({
  declarations: [
    BondComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(BondRoutes),
    IgxDemoModule,
    IgxIconModule,
    FormsModule,
    IgxDateRangePickerModule,
    FormsModule,
    IgxSelectModule,
    IgxInputGroupModule,
  ],
  providers: [
    BondService,
    BondResolver,
    BondTickerResolver
  ]
})
export class BondModule { }
