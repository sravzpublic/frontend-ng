
import {of as observableOf,  Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// https://blog.angular-university.io/rxjs-error-handling/

@Injectable()
export class RxjsHelperService {

  constructor(private toastrService: ToastrService) {}

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error && error.error) {
        this.toastrService.error(`${operation}: Error encountered - ${error.error.message}`,null, {
          positionClass: 'toast-bottom-center' });
        console.error(error);
      }
      return observableOf(error as T);
    };
  }

  handleErrorAndCallFunc<T> (operation = 'operation', result?: T, func?: () => void) {
    return (error: any): Observable<T> => {
      this.toastrService.error(`${operation}: Error encountered`,null, {
        positionClass: 'toast-bottom-center' });
      console.error(error);
      return observableOf(result as T);
    };
  }

  handleAndThrowError<T> (operation = 'operation', result?: T, ) {
    return (error: any): Observable<T> => {
      this.toastrService.error('Error encountered',null, {
        positionClass: 'toast-bottom-center' });
      return throwError(error);
    };
  }

}
