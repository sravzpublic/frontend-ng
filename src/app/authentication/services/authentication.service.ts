import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User, LoginResult } from '../models/user';
import { Login, ExternalLogin } from '../models/login';
import { Register } from '../models/register';
import { parseUser } from './jwt-util';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { InitUserService } from '../../@theme/services/init-user.service';
import { environment } from '../../../environments/environment';

// http://localhost:3030/api

/** Authentication API Service */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
    protected nbAuthService: NbAuthService,
    protected initUserService: InitUserService, ) { }

  /** Send basic credentials to login endpoint. */
  public async login(userData: Login): Promise<LoginResult> {
    return this.loginPost('/login', userData);
  }

  /** Send user info from 3rd party provider to external login endpoint. */
  public async loginWith(userInfo: ExternalLogin): Promise<LoginResult> {
    return this.loginPost('/extlogin', userInfo);
  }

  public async loginWithExternal(userInfo: ExternalLogin): Promise<LoginResult> {
    return this.loginPost(`${environment.BACKEND_NODE_URL}/auth/verifyexternal`, userInfo);
  }

  /** Send user info to register endpoint. */
  public async register(userData: Register): Promise<LoginResult> {
    return this.loginPost('/register', userData);
  }

  protected async loginPost(endpoint: string, userData: any): Promise<LoginResult> {
    let response: any;
    try {
      response = await this.http.post(endpoint, userData).toPromise() as string;
    } catch (e) {
      return { error: e.message };
    }
    // OIDC User
    const user: User = parseUser(response.token.access_token);

    // const expectedNBResponse = {
    //   'headers': {
    //     'normalizedNames': {},
    //     'lazyUpdate': null
    //   },
    //   'status': 200,
    //   'statusText': 'OK',
    //   'url': 'http://localhost:3030/api/auth/login',
    //   'ok': true,
    //   'type': 4,
    //   'body': {
    //     'token': {
    //       'expires_in': 3600,
    //       'access_token': ''
    //     }
    //   }
    // };

    // const fakeRespoinse = {
    //   'token': {
    //     'expires_in': 3600,
    //     'access_token': ''
    //   }
    // };

    const expectedNBResponse = {
      'headers': {
        'normalizedNames': {},
        'lazyUpdate': null
      },
      'status': 200,
      'statusText': 'OK',
      'url': 'http://localhost:3030/api/auth/login',
      'ok': true,
      'type': 4,
      'body': response
    };

    // Set NBAuth User
    this.nbAuthService.authenticate('oidc', expectedNBResponse).subscribe((result: NbAuthResult) => {
      user.nbAuthResult = result;
    });
    return { user };
  }
}
