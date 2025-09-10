import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuturesComponent } from './futures.component';
import { FuturesRoutes } from './futures.routes';
import { RouterModule } from '@angular/router';
import { FuturesResolver } from './futures-resolver.service';
import { FuturesService } from './futures.service';
import { SharedModule } from '../shared/shared-module';
import { CrudModule } from '../crud/crud.module';
import { MaterialModule } from '../material-module';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgxDialogModule, IgxDropDownModule, IgxInputGroupModule, IgxSelectModule, IgxTabsModule, IgxToggleModule } from '@infragistics/igniteui-angular';
import { IgxCategoryChartModule, IgxLegendModule } from 'igniteui-angular-charts';

@NgModule({
  declarations: [
    FuturesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FuturesRoutes),
    SharedModule,
    CrudModule,
    SharedModule,
    MaterialModule,
    MatNativeDateModule,
    FormsModule,
    IgxDemoModule,
    IgxTabsModule,
    IgxCategoryChartModule,
    IgxLegendModule,    
    IgxDropDownModule,
    IgxInputGroupModule,
    IgxDialogModule,
    IgxSelectModule,
    IgxToggleModule
  ],
  providers: [
    FuturesResolver,
    FuturesService
  ]
})
export class FuturesModule { }
