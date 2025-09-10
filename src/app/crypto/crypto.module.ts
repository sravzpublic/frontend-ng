import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoComponent } from './crypto.component';
import { CryptoRoutes } from './crypto.routes';
import { RouterModule } from '@angular/router';
import { CryptoResolver } from './crypto-resolver.service';
import { CryptoService } from './crypto.service';


import { CrudModule } from '../crud/crud.module';

import { SharedModule } from '../shared/shared-module';
import { CryptoTearsheetComponent } from './cryptotearsheet.component';
import { AnalyticsService } from '../analytics.service';

@NgModule({
  declarations: [
    CryptoComponent,
    CryptoTearsheetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CryptoRoutes),


    CrudModule,
    SharedModule
  ],
  providers: [
    CryptoResolver,
    CryptoService,

    AnalyticsService
  ]
})
export class CryptoModule { }
