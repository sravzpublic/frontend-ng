/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User, UserData } from '../../interfaces/common/users';

@Injectable()
export class UsersService extends UserData {

  getCurrentUser(): Observable<User> {
    return observableOf(this.data[0]);
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<User[]> {
    return observableOf(this.data);
  }

  get(id: number): Observable<User> {
    return observableOf(this.data.find(x => x.id === id));
  }

  updateCurrent(user: User): Observable<User> {
    this.data[0] = user;

    return observableOf(user);
  }

  update(user: User): Observable<User> {
    const i = this.data.indexOf(this.data.find(x => x.id === user.id));
    if (i >= 0) {
      this.data[i] = user;
    }
    return observableOf(user);
  }

  create(user: User): Observable<User> {
    user.id = Math.max(...this.data.map(x => x.id)) + 1;
    this.data.push(user);
    return observableOf(user);
  }

  delete(id: number): Observable<boolean> {
    this.data = [...this.data.filter(x => x.id !== id)];
    return observableOf();
  }

  private data: User[] = [
    {
      id: 1,
      role: 'user',
      firstName: 'Mark',
      lastName: 'Walmart',
      userName: 'MarkW',
      login: '@mdo',
      email: 'mdo@gmail.com',
      age: 0,
      picture: '',
      address: {
        street: 'Wall St.',
        city: 'New York',
        zipCode: '10005',
      },
      settings: {
        themeName: 'material-light',
      },
    },
    {
      id: 2,
      role: 'user',
      firstName: 'Jacob',
      lastName: 'Cuba',
      userName: 'JacobC',
      login: '@mdo',
      email: 'mdo@gmail.com',
      age: 0,
      picture: '',
      address: {
        street: 'Wall St.',
        city: 'New York',
        zipCode: '10005',
      },
      settings: {
        themeName: 'material-dark',
      },
    },
    {
      id: 3,
      role: 'user',
      firstName: 'Larry',
      lastName: 'Page',
      userName: 'LarryP',
      login: '@twitter',
      email: 'twitter@outlook.com',
      age: 0,
      picture: '',
      address: {
        street: 'Wall St.',
        city: 'New York',
        zipCode: '10005',
      },
      settings: {
        themeName: 'material-dark',
      },
    },
    {
      id: 4,
      role: 'user',
      firstName: 'John',
      lastName: 'Snow',
      userName: 'JohnS',
      login: '@snow',
      email: 'snow@gmail.com',
      age: 0,
      picture: '',
      address: {
        street: 'Wall St.',
        city: 'New York',
        zipCode: '10005',
      },
      settings: {
        themeName: 'material-light',
      },
    }];
}
