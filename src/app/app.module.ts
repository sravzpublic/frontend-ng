import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxAvatarModule, IgxBadgeModule, IgxButtonModule, IgxCheckboxModule, IgxDropDownModule, IgxGridModule, IgxGridRowComponent, IgxIconModule, IgxInputGroupModule, IgxSnackbarModule, IgxSwitchModule, IgxToggleModule } from 'igniteui-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IgxCategoryChartModule } from 'igniteui-angular-charts';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IgxGridModule,
    FormsModule,
    IgxAvatarModule,
    IgxBadgeModule,
    IgxButtonModule,
    IgxSnackbarModule,
    IgxIconModule,
    IgxInputGroupModule,
    IgxSwitchModule,
    IgxDropDownModule,
    IgxButtonModule,
    IgxToggleModule,
    IgxDropDownModule,
    IgxInputGroupModule,
    IgxCheckboxModule,
    IgxCategoryChartModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
