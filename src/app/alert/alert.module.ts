import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { IgxIconModule, IgxDateRangePickerModule, IgxSelectModule, IgxInputGroupModule, IgxToastModule, IgxActionStripModule } from '@infragistics/igniteui-angular';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './alert-component';
import { AlertRoutes } from './alert.routes';
import { AlertService } from './alert.service';
import { AlertResolver } from './alert-resolver.service';



@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AlertRoutes),
    IgxDemoModule,
    IgxIconModule,
    FormsModule,
    IgxDateRangePickerModule,
    FormsModule,
    IgxSelectModule,
    IgxInputGroupModule,
    IgxToastModule,
    IgxActionStripModule
  ],
  providers: [
    AlertService,
    AlertResolver,
  ]
})
export class AlertModule { }
