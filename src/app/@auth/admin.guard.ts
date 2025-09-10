/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbRoleProvider } from '@nebular/security';
import { ROLES } from './roles';

@Injectable()
export class AdminGuard {
  constructor(private roleProvider: NbRoleProvider,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return true;
    }
    return this.roleProvider.getRole()
      .pipe(map(role => {
        const roles = role instanceof Array ? role : [role];
        if (roles.some(x => x && x.toLowerCase() === ROLES.ADMIN)) {
          return true;
        } else {
          this.router.navigate(['401'], { queryParams: { returnUrl: state.url } });
        }
      }));
  }
}
