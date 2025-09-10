import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetTypeSelectorComponent } from './asset_type.selector.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule
  ],
  exports: [
    AssetTypeSelectorComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  declarations: [
    AssetTypeSelectorComponent
  ],
  providers: []
})
export class AssetTypeSelectorModule { }
