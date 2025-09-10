import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeedRoutes } from './feed.routes';

import { FeedService } from './feed.service';
import { FeedCardComponent } from './feed-card-component';
import { FeedComponent } from './feed-component';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { FeedResolver } from './feed-resolver.service';
import { IgxIconModule, IgxDateRangePickerModule, IgxSelectModule, IgxInputGroupModule, IgxTabsModule } from '@infragistics/igniteui-angular';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipe/pipes.module';

@NgModule({
  declarations: [
    FeedCardComponent,
    FeedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FeedRoutes),

    IgxDemoModule,
    IgxIconModule,
    FormsModule,
    IgxDateRangePickerModule,
    FormsModule,
    IgxSelectModule,
    IgxInputGroupModule,
    PipesModule,
    IgxTabsModule
  ],
  providers: [
    FeedService,
    FeedResolver
  ]
})
export class FeedModule { }
