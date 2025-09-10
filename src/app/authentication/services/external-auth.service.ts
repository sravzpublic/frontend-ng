import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { AuthProvider } from '../providers/auth-provider';
import { GoogleProvider } from '../providers/google-provider';
import { FacebookProvider } from '../providers/facebook-provider';
import { MicrosoftProvider } from '../providers/microsoft-provider';
import { TwitterProvider } from '../providers/twitter-provider';
import { Location } from '@angular/common';
import { ExternalLogin } from '../models/login';
import { ExternalAuthProvider, ExternalAuthConfig } from './external-auth-configs';
import { LinkedInProvider } from '../providers/linkedin-provider';

export enum ExternalAuthRedirectUrl {
  Facebook = 'redirect-facebook',
  Google = 'redirect-google',
  Microsoft = 'redirect-microsoft',
  Twitter = 'redirect-twitter',
  LinkedIn = 'redirect-linkedin'
}

@Injectable({
    providedIn: 'root'
})
export class ExternalAuthService {
  protected providers: Map<ExternalAuthProvider, AuthProvider> = new Map();
  public get activeProvider(): ExternalAuthProvider {
    return localStorage.getItem('extActiveProvider') as ExternalAuthProvider;
  }
  public set activeProvider(provider: ExternalAuthProvider) {
    localStorage.setItem('extActiveProvider', provider);
  }

  constructor(
      private router: Router,
      private oidcSecurityService: OidcSecurityService,
      private location: Location) {
  }

  public hasProvider(provider?: ExternalAuthProvider) {
    if (provider) {
      return this.providers.has(provider);
    }
    return this.providers.size > 0;
  }

  public addGoogle(clientID: string) {
    const googleConfig: ExternalAuthConfig = {
      provider: ExternalAuthProvider.Google,
      stsServer: 'https://accounts.google.com',
      client_id: clientID,
      scope: 'openid email profile',
      redirect_url: this.getAbsoluteUrl(ExternalAuthRedirectUrl.Google),
      response_type: 'id_token token',
      post_logout_redirect_uri: '/',
      post_login_route: 'redirect',
      auto_userinfo: false,
      max_id_token_iat_offset_allowed_in_seconds: 30
    };
    this.providers.set(
      ExternalAuthProvider.Google,
      new GoogleProvider(this.oidcSecurityService, googleConfig)
    );
  }

  public addTwitter(clientID: string) {
    const twitterConfig: ExternalAuthConfig = {
      provider: ExternalAuthProvider.Twitter,
      stsServer: 'https://api.twitter.com/oauth2/token',
      client_id: clientID,
      scope: 'openid email profile',
      redirect_url: this.getAbsoluteUrl(ExternalAuthRedirectUrl.Twitter),
      response_type: 'id_token token',
      post_logout_redirect_uri: '/',
      post_login_route: 'redirect',
      auto_userinfo: false,
      max_id_token_iat_offset_allowed_in_seconds: 30
    };
    this.providers.set(
      ExternalAuthProvider.Twitter,
      new TwitterProvider(this.oidcSecurityService, twitterConfig)
    );
  }

  public addLinkedIn(clientID: string) {
    const twitterConfig: ExternalAuthConfig = {
      provider: ExternalAuthProvider.Twitter,
      stsServer: 'https://www.linkedin.com/uas/oauth2/authorization',
      client_id: clientID,
      scope: 'openid email profile',
      redirect_url: this.getAbsoluteUrl(ExternalAuthRedirectUrl.Twitter),
      response_type: 'id_token token',
      post_logout_redirect_uri: '/',
      post_login_route: 'redirect',
      auto_userinfo: false,
      max_id_token_iat_offset_allowed_in_seconds: 30
    };
    this.providers.set(
      ExternalAuthProvider.LinkedIn,
      new LinkedInProvider(this.oidcSecurityService, twitterConfig)
    );
  }


  public addFacebook(clientID: string) {
    const fbConfig: ExternalAuthConfig = {
      client_id: clientID,
      redirect_url: ExternalAuthRedirectUrl.Facebook
    } as ExternalAuthConfig;

    this.providers.set(
      ExternalAuthProvider.Facebook,
      new FacebookProvider(fbConfig, this.router)
    );
  }

  public addMicrosoft(clientID: string) {
    const msConfig: ExternalAuthConfig = {
      provider: ExternalAuthProvider.Microsoft,
      stsServer: 'https://login.microsoftonline.com/consumers/v2.0/',
      client_id: clientID,
      scope: 'openid email profile',
      redirect_url: this.getAbsoluteUrl(ExternalAuthRedirectUrl.Microsoft),
      response_type: 'id_token token',
      post_logout_redirect_uri: '/',
      post_login_route: '',
      auto_userinfo: false,
      max_id_token_iat_offset_allowed_in_seconds: 1000
    };
    this.providers.set(
      ExternalAuthProvider.Microsoft,
      new MicrosoftProvider(this.oidcSecurityService, msConfig)
    );
  }

  public login(provider: ExternalAuthProvider) {
      const extProvider = this.providers.get(provider);
      if (extProvider) {
        this.activeProvider = provider;
        extProvider.login(provider);
      }
  }

  /** TODO, use setActiveProvider only? */
  public async getUserInfo(provider: ExternalAuthProvider): Promise<ExternalLogin> {
      const extProvider = this.providers.get(provider);
      if (extProvider) {
        const userInfo = await extProvider.getUserInfo();
        userInfo.externalProvider = provider;
        return userInfo;
      }
      return Promise.reject(null); // TODO ?
  }

  /**
   * logout
   */
  public logout() {
    if (this.activeProvider) {
      this.providers.get(this.activeProvider).logout(this.activeProvider);
    }
  }

  /** Returns an absolute URL like <app root URL>/path */
  protected getAbsoluteUrl(path: string) {
    return window.location.origin	+ this.location.prepareExternalUrl(path);
  }
}
