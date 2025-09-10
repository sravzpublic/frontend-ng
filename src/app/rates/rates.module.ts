import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatesComponent } from './rates.component';
import { RatesRoutes } from './rates.routes';
import { RouterModule } from '@angular/router';
import { RatesResolver } from './rates-resolver.service';
import { RatesService } from './rates.service';
import { CrudModule } from '../crud/crud.module';
import { SharedModule } from '../shared/shared-module';
import { MortgageRatesResolver } from './mortgage-rates-resolver.service';
import { MortgageRatesComponent } from './mortgage-rates.component';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgxTabsModule } from '@infragistics/igniteui-angular';


@NgModule({
  declarations: [
    RatesComponent,
    MortgageRatesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RatesRoutes),
    CrudModule,
    SharedModule,
    IgxDemoModule,
    IgxTabsModule
  ],
  providers: [
    RatesResolver,
    MortgageRatesResolver,
    RatesService,

  ]
})
export class RatesModule { }
