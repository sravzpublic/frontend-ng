import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterArrayPipe } from './filterArrayPipe';
import { ObjectKeysPipe } from './object-keys.pipe';
import { SafeHtmlPipe } from './safe-html-pipe';
import { AutocompletePipeStartsWith } from './startswith-pipe';
import { StripHtmlTagsPipe } from './strip-html-tags.pipe';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    AutocompletePipeStartsWith,
    ObjectKeysPipe,
    StripHtmlTagsPipe,
    FilterArrayPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
  ],
  exports: [
    SafeHtmlPipe,
    AutocompletePipeStartsWith,
    ObjectKeysPipe,
    StripHtmlTagsPipe,
    FilterArrayPipe
  ]
})
export class PipesModule {}
