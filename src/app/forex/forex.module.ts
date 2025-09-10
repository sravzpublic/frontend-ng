import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForexComponent } from './forex.component';
import { ForexRoutes } from './forex.routes';
import { RouterModule } from '@angular/router';
import { ForexResolver } from './forex-resolver.service';
import { ForexService } from './forex.service';


import { CrudButtonsComponent } from '../crud/crud-buttons';
import { CrudModule } from '../crud/crud.module';
import { SharedModule } from '../shared/shared-module';
import { IgxTabsModule } from '@infragistics/igniteui-angular';

@NgModule({
  declarations: [
    ForexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ForexRoutes),
    IgxTabsModule,
    CrudModule,
    SharedModule
  ],
  providers: [
    ForexResolver,
    ForexService
  ]
})
export class ForexModule { }
