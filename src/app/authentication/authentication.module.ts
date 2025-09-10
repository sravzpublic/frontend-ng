import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginBarComponent } from './login-bar/login-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RedirectComponent } from './redirect/redirect.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';

import { AuthModule } from 'angular-auth-oidc-client';
import {
  IgxDialogModule, IgxIconModule,
  IgxInputGroupModule, IgxButtonModule,
  IgxAvatarModule, IgxToggleModule, IgxDropDownModule, IgxRippleModule
} from '@infragistics/igniteui-angular';
import { NbOIDCAuthStrategy } from './services/nboidc.auth.service';
import { environment } from '../../environments/environment';
import { ExternalAuthProvider } from './services/external-auth-configs';


// function getAbsoluteUrl(path: string) {
//   return window.location.origin	+ this.location.prepareExternalUrl(path);
// }


@NgModule({ declarations: [
        LoginBarComponent,
        LoginComponent,
        RedirectComponent,
        RegisterComponent,
        LoginDialogComponent,
        ProfileComponent,
    ],
    exports: [
        LoginBarComponent,
        LoginComponent,
        RedirectComponent,
        RegisterComponent,
        LoginDialogComponent,
        ProfileComponent
    ], imports: [CommonModule,
        ReactiveFormsModule,
        AuthModule.forRoot({
            config: [
                {
                    configId: ExternalAuthProvider.Google,
                    authority: 'https://accounts.google.com',
                    clientId: environment.GOOGLE_CLIENT_KEY,
                    scope: 'openid email profile',
                    redirectUrl: window.location.origin + "/redirect-google", // getAbsoluteUrl(ExternalAuthRedirectUrl.Google),
                    responseType: 'id_token token',
                    postLogoutRedirectUri: '/',
                    postLoginRoute: 'redirect',
                    autoUserInfo: false,
                    maxIdTokenIatOffsetAllowedInSeconds: 30
                }
            ],
        }),
        AuthenticationRoutingModule,
        IgxToggleModule,
        IgxRippleModule,
        IgxDialogModule,
        IgxInputGroupModule,
        IgxIconModule,
        IgxAvatarModule,
        IgxButtonModule,
        IgxDropDownModule], providers: [
        AuthGuard,
        // TODO: DELETE THIS BEFORE PRODUCTION!
        // BackendProvider
        NbOIDCAuthStrategy,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AuthenticationModule { }
