import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexSelectorComponent } from './index.selector.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule
  ],
  exports: [
    IndexSelectorComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  declarations: [
    IndexSelectorComponent
  ],
  providers: []
})
export class IndexSelectorModule { }
