import { OidcSecurityService} from 'angular-auth-oidc-client';
import { AuthProvider } from './auth-provider';
import { ExternalLogin } from '../models/login';
import { ExternalAuthConfig } from '../services/external-auth-configs';

/** Base provider for OpenID Connect (OIDC) https://openid.net/connect/ */
export abstract class BaseOidcProvider implements AuthProvider {
    constructor(protected oidcSecurityService: OidcSecurityService,
                protected externalStsConfig: ExternalAuthConfig) {}

    public config() {

        // const config: OpenIdConfiguration = {
        //     stsServer : this.externalStsConfig.stsServer,
        //     redirectUrl : this.externalStsConfig.redirect_url,
        //     clientId : this.externalStsConfig.client_id,
        //     responseType : this.externalStsConfig.response_type,
        //     scope : this.externalStsConfig.scope,
        //     postLogoutRedirectUri : this.externalStsConfig.redirect_url,
        //     postLoginRoute : this.externalStsConfig.post_login_route,
        //     autoUserinfo : this.externalStsConfig.auto_userinfo,
        //     maxIdTokenIatOffsetAllowedInSeconds :
        //         this.externalStsConfig.max_id_token_iat_offset_allowed_in_seconds
        // };
        // this.oidcSecurityService.setupModule(config, configResult.authWellknownEndpoints);
    }

    public login(configId) {
        this.oidcSecurityService.authorize(configId);
        // this.oidcConfigService.onConfigurationLoaded.pipe(take(1)).subscribe((configResult: ConfigResult) => {
        //     this.config();
        //     this.oidcSecurityService.authorize();
        // });
        // this.oidcConfigService.load_using_stsServer(this.externalStsConfig.stsServer);
    }

    public getUserInfo(): Promise<ExternalLogin> {
        let resolve: (val: ExternalLogin) => void;
        let reject: () => void;
        const user = new Promise<ExternalLogin>((res, rej) => {
            resolve = res;
            reject = rej;
        });
        this.oidcSecurityService.checkAuth().subscribe((result) => {
            this.oidcSecurityService.isAuthenticated$.subscribe(
                (isAuthenticated) => {
                  if (isAuthenticated.isAuthenticated) {
                  //this.isAuthenticated = isAuthenticated;
                  this.oidcSecurityService.userData$.subscribe(userData => { 
                    resolve(this.formatUserData(userData));
                  });
                  } else {
                    reject()
                  }              
                }
            );            
        })
        // this.oidcConfigService.onConfigurationLoaded.pipe(take(1)).subscribe((configResult: ConfigResult) => {
        //     this.config(configResult);
        //     this.oidcSecurityService.onAuthorizationResult.subscribe(() => {
        //         this.oidcSecurityService.getUserData().subscribe(userData => { //this.oidcSecurityService.userData$.subscribe((userData: any) => {
        //             resolve(this.formatUserData(userData));
        //         });
        //     });
        //     this.oidcSecurityService.authorizedImplicitFlowCallback();
        // });
        // this.oidcConfigService.load_using_stsServer(this.externalStsConfig.stsServer);
        return user;
    }

    public logout(configId) {
        this.oidcSecurityService.logoff(configId).subscribe(() => {});
    }

    /** Format received user data per provider claims */
    protected abstract formatUserData(userData): ExternalLogin;
}
