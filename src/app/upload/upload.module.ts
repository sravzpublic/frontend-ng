import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogComponent } from './dialog/dialog.component';
import { UploadService } from './upload.service';
import { RouterModule } from '@angular/router';
import { UploadRoutes } from './upload.routes';
import { UploadComponent } from './upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AssetTypeSelectorModule } from '../asset_type_selector/asset_type-selector.module';
import { IgxButtonGroupModule, IgxButtonModule, IgxIconModule, IgxProgressBarModule, IgxRippleModule } from '@infragistics/igniteui-angular';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UploadRoutes),
    FileUploadModule,
    AssetTypeSelectorModule,
    IgxIconModule,
    IgxButtonGroupModule,
    FormsModule,
    IgxButtonGroupModule,
    IgxIconModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxProgressBarModule
  ],
  declarations: [UploadComponent, DialogComponent],
  exports: [UploadComponent],
  providers: [UploadService]
})
export class UploadModule { }
