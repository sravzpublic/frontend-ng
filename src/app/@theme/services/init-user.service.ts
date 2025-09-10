/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Observable } from 'rxjs';
import { User, UserData } from '../../@core/interfaces/common/users';
import { tap } from 'rxjs/operators';
import { UserStore } from '../../@core/stores/user.store';
import { Injectable } from '@angular/core';

@Injectable()
export class InitUserService {
    constructor(protected userStore: UserStore,
        protected usersService: UserData) { }

    /* Set the user details after login - Used to display the user profile information */
    initCurrentUser(): Observable<User> {
      return this.usersService.getCurrentUser()
            .pipe(tap((user: User) => {
                if (user) {
                  this.userStore.setUser(user);

                  // if (user.settings && user.settings.themeName) {
                  //   if (this.jsThemes.has(user.settings.themeName)
                  //     && !!this.jsThemes.get(user.settings.themeName).variables.initialized) {
                  //     this.themeService.changeTheme(user.settings.themeName);
                  //   }
                  // }
                }
            }));
    }
}
