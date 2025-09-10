import { ExternalLogin } from '../models/login';
import { BaseOidcProvider } from './base-oidc-provider';

export class LinkedInProvider extends BaseOidcProvider {
    /**
     * Format user data per provider claims:
     * https://developers.google.com/identity/protocols/OpenIDConnect
     * https://developers.google.com/+/web/api/rest/openidconnect/getOpenIdConnect
     */
    protected formatUserData(userData): ExternalLogin {
        const login: ExternalLogin = {
            id: userData.sub,
            name: userData.name,
            username: '',
            email: userData.email,
            given_name: userData.given_name,
            family_name: userData.family_name,
            picture: userData.picture,
            access_token: '' // this.oidcSecurityService.getAccessToken(),
        };
        this.oidcSecurityService.getAccessToken().subscribe((x: string) => login.access_token = x);
        return login;
    }
}
