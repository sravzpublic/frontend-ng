/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpRequest } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NbAuthJWTInterceptor,
  NbAuthModule,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbTokenLocalStorage,
} from '@nebular/auth';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { AuthPipe } from './auth.pipe';
import { RoleProvider } from './role.provider';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { ComponentsModule } from '../@components/components.module';

import {
  NgxLoginComponent,
  NgxLoginGuestComponent,
  NgxAuthComponent,
  NgxAuthBlockComponent,
  NgxLogoutComponent,
  NgxRegisterComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent,
} from './components';

import { AuthRoutingModule } from './auth-routing.module';
import { authOptions } from './auth.settings';
import { authSettings } from './access.settings';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';

import {
  IgxButtonGroupModule,
  IgxButtonModule,
  IgxIconModule,
  IgxCardModule,
  IgxRippleModule,
  IgxToggleModule,
  IgxDialogModule,
  IgxInputGroupModule,
  IgxAvatarModule,
  IgxDropDownModule,
  IgxCheckboxModule,
  IgxLayoutModule
 } from '@infragistics/igniteui-angular';
import { NbOIDCAuthStrategy } from '../authentication/services/nboidc.auth.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


const GUARDS = [AuthGuard, AdminGuard];
const PIPES = [AuthPipe];
const COMPONENTS = [
  NgxLoginComponent,
  NgxAuthComponent,
  NgxLogoutComponent,
  NgxLoginGuestComponent,
  NgxRegisterComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent,
  NgxAuthBlockComponent,
];

export function filterInterceptorRequest(req: HttpRequest<any>): boolean {
  return environment.JWT_IGNORE_PATHS.some(url => req.url.includes(url));
}

@NgModule({
  declarations: [...PIPES, ...COMPONENTS],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    NbAuthModule.forRoot(authOptions),
    IgxDemoModule,
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule,
    IgxRippleModule,
    IgxToggleModule,
    IgxRippleModule,
    IgxDialogModule,
    IgxInputGroupModule,
    IgxIconModule,
    IgxAvatarModule,
    IgxButtonModule,
    IgxDropDownModule,
    IgxCheckboxModule,
    IgxButtonGroupModule,
    IgxLayoutModule
  ],
  exports: [...PIPES],
  providers: [
    NbSecurityModule.forRoot({
      accessControl: authSettings,
    }).providers,
    {
      provide: NbRoleProvider, useClass: RoleProvider,
    },
    {
      provide: NbTokenLocalStorage, useClass: NbTokenLocalStorage,
    },
    NbOIDCAuthStrategy,
    AuthService
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
        { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
        ...GUARDS,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        ],
    };
  }
}
