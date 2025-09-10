
import { ExternalLogin } from '../models/login';
import { BaseOidcProvider } from './base-oidc-provider';

export class MicrosoftProvider extends BaseOidcProvider {
    public static keysURL = 'ms-discovery/keys';

    /** ADD endpoint specific tenant + ID, used when connecting users from work or school accounts.
     * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc#fetch-the-openid-connect-metadata-document
     */
    public tenant = 'consumers';
    public tenantID = '';

    public config() {
        if (this.tenant !== 'consumers') {
          // Replace common discovery URL issuer with correct tenant ID for token validation:
        //   configResult.authWellknownEndpoints.issuer =
        //   configResult.authWellknownEndpoints.issuer.issuer.replace('{tenantid}', this.tenantID);
        }

        // Microsoft OIDC doesn't support CORS for keys discovery URIs, intended for backend
        // See https://stackoverflow.com/a/44688644
        // Example implementation:
        // tslint:disable-next-line:max-line-length
        // https://blogs.msdn.microsoft.com/mihansen/2018/07/12/net-core-angular-app-with-openid-connection-implicit-flow-authentication-angular-auth-oidc-client/
        // https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc
        // configResult.authWellknownEndpoints.issuer.jwks_uri = MicrosoftProvider.keysURL;
        // super.config(configResult);
    }

    /**
     * Format user data response from available claims:
     * https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens#payload-claims
     */
    protected formatUserData(userData): ExternalLogin {
        const login: ExternalLogin = {
            id: userData.oid,
            username: '',
            name: userData.name,
            email: userData.email,
            access_token: '' // this.oidcSecurityService.getAccessToken(),
        };
        this.oidcSecurityService.getAccessToken().subscribe((x: string) => login.access_token = x);
        return login;
    }
}
