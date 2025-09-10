import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SravzAssetListComponent } from '../assets/sravz.assets.list.component';


import { CrudButtonsComponent } from '../crud/crud-buttons';
import { CrudModule } from '../crud/crud.module';
import { SharedModule } from '../shared/shared-module';
import { EconomicsRoutes } from './economics.routes';
import { EconomicService } from './economic.service';
import { CalendarResolver } from './economic-resolver.service';
import { CalendarComponent } from './calendar.component';
import { MaterialModule } from '../material-module';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgxTabsModule } from '@infragistics/igniteui-angular';
import { USFedCalendarResolver } from './economic-usfed-resolver.service';

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EconomicsRoutes),


    CrudModule,
    SharedModule,
    MaterialModule,
    MatNativeDateModule,
    FormsModule,
    IgxDemoModule,
    IgxTabsModule
  ],
  providers: [
    EconomicService,
    CalendarResolver,
    USFedCalendarResolver
  ]
})
export class EconomicsModule { }
