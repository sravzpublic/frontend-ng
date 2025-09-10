import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared-module';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IBKRResolver } from './ibkr-resolver.service';
import { IBKRComponent } from './ibkr.component';
import { IBKRRoutes } from './ibkr.routes';
import { RouterModule } from '@angular/router';
import { IgxIconModule, IgxTabsModule } from '@infragistics/igniteui-angular';
import { PipesModule } from '../pipe/pipes.module';

@NgModule({
  declarations: [
    IBKRComponent
  ],
  imports: [
    RouterModule.forChild(IBKRRoutes),
    CommonModule,
    SharedModule,
    IgxDemoModule,
    IgxTabsModule,
    PipesModule,
    IgxIconModule
  ],
  providers: [
    IBKRResolver
  ]
})
export class IBKRModule { }
