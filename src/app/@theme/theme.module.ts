/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { AuthModule } from '../@auth/auth.module';

import {
  SearchInputComponent,
} from './components';
import {
  MeasureConverterPipe,
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import { InitUserService } from './services/init-user.service';

const COMPONENTS = [
  SearchInputComponent,
];
const PIPES = [
  CapitalizePipe,
  MeasureConverterPipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule, MatRippleModule, AuthModule,],
  exports: [CommonModule, MatRippleModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        InitUserService,
      ],
    };
  }
}
