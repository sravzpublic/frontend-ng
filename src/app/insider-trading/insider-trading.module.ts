import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { FormsModule } from '@angular/forms';
import { InsiderTradingRoutes } from './insider-trading.routes';
import { InsiderTradingComponent } from './insider-trading-component';
import { FundamentalsService } from '../fundamentals/fundamental.service';
import { InsiderTradingResolver } from './insider-trading-resolver.service';
import { IgxItemLegendModule, IgxLegendModule, IgxPieChartModule } from 'igniteui-angular-charts';



@NgModule({
  declarations: [
    InsiderTradingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(InsiderTradingRoutes),
    IgxDemoModule,
    FormsModule,
    FormsModule,
    IgxPieChartModule,
    IgxLegendModule,
    IgxItemLegendModule
  ],
  providers: [
    FundamentalsService,
    InsiderTradingResolver
  ]
})
export class InsiderTradingModule { }
