import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgxIconModule, IgxDateRangePickerModule, IgxSelectModule, IgxInputGroupModule } from '@infragistics/igniteui-angular';
import { FormsModule } from '@angular/forms';
import { ETFComponent } from './etf-component';
import { ETFRoutes } from './etf.routes';
import { ETFService } from './etf.service';
import { ETFResolver } from './etf-resolver.service';
import { ETFTickerResolver } from './etf-ticker-resolver.service';



@NgModule({
  declarations: [
    ETFComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ETFRoutes),
    IgxDemoModule,
    IgxIconModule,
    FormsModule,
    IgxDateRangePickerModule,
    FormsModule,
    IgxSelectModule,
    IgxInputGroupModule,
  ],
  providers: [
    ETFService,
    ETFResolver,
    ETFTickerResolver
  ]
})
export class ETFModule { }
