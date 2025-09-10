import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';


import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssetTypeSelectorModule } from '../asset_type_selector/asset_type-selector.module';
import { CrudButtonsComponent } from '../crud/crud-buttons';
import { CrudModule } from '../crud/crud.module';
import { QuoteRoutes } from './quotes.routes';
import { QuoteListComponent } from './quotes.list.component';
import { SharedModule } from '../shared/shared-module';
import { NumericEditorComponent } from '../common/numeric-editor.component';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { SharedUIModule } from '../shared/shared-ui-module';
import { IgxIconModule, IgxTabsModule } from '@infragistics/igniteui-angular';


@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(QuoteRoutes),
    IgxIconModule,
    IgxTabsModule,
    AssetTypeSelectorModule,
    CrudModule,
    SharedModule,
    SharedUIModule,
    IgxDemoModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  declarations: [
    QuoteListComponent
  ],
  providers: [
    DatePipe
  ]
})
export class QuoteModule { }
