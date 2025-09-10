import { Injectable } from '@angular/core';

@Injectable()
export class PersistanceService {

  public CACHE_KEYS_TO_DELETE = ['angular-cache', 'ANALYTICS_CACHE_KEY', 'ANALYTICS_CACHE_KEY_expiresIn'];

  constructor() { }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  clearAll() {
    localStorage.clear();
  }

  clearHTTPCache() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (this.CACHE_KEYS_TO_DELETE.includes(localStorage.key(i))) {
        keys.push(localStorage.key(i));
      }
    }
    keys.map(key => this.remove(key));
  }

  /*  removeStorage: removes a key from localStorage and its sibling expiracy key
      params:
          key <string>     : localStorage key to remove
      returns:
          <boolean> : telling if operation succeeded
   */
  removeStorage(name) {
    try {
      localStorage.removeItem(name);
      localStorage.removeItem(name + '_expiresIn');
    } catch (e) {
      console.log('removeStorage: Error removing key [' + name + '] from localStorage: ' + JSON.stringify(e));
      return false;
    }
    return true;
  }
  /*  getStorage: retrieves a key from localStorage previously set with setStorage().
    params:
        key <string> : localStorage key
    returns:
        <string> : value of localStorage key
        null : in case of expired key or failure
  */
  getStorage(key): any {

    const now = Date.now();  // epoch time, lets deal only with integer
    // set expiration for storage
    let expiresIn = null;
    try {
      expiresIn = Number(localStorage.getItem(key + '_expiresIn'));
      if (expiresIn === undefined || expiresIn === null) { expiresIn = 0; }
    } catch (e) {
      console.log('getStorage: Error reading key [' + key + '] from localStorage: ' + JSON.stringify(e));
      return null;
    }
    if (expiresIn < now) {// Expired
      this.removeStorage(key);
      return null;
    } else {
      try {
        const value = this.get(key);
        return value;
      } catch (e) {
        console.log('getStorage: Error reading key [' + key + '] from localStorage: ' + JSON.stringify(e));
        return null;
      }
    }
  }
/*  setStorage: writes a key into localStorage setting a expire time
  params:
      key <string>     : localStorage key
      value <string>   : localStorage value
      expires <number> : expiry epoch time
  returns:
      <boolean> : telling if operation succeeded
*/
setStorage(key, value, expires) {
  // epoch to next midnight: (new Date()).setHours(24,0,0,0)
  if (expires === undefined || expires === null) {
    expires = (new Date()).setHours(24, 0, 0, 0);  // expires midnight
  } else {
    expires = Math.abs(expires); // make sure it's positive
  }

  try {
    this.set(key, value);
    localStorage.setItem(key + '_expiresIn', expires.toString());
  } catch (e) {
    console.log('setStorage: Error setting key [' + key + '] in localStorage: ' + JSON.stringify(e));
    return false;
  }
  return true;
}
}
