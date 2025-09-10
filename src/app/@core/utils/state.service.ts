/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable, OnDestroy } from '@angular/core';
import { of as observableOf,  Observable,  BehaviorSubject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Injectable()
export class StateService implements OnDestroy {

  protected layouts: any = [
    {
      name: 'One Column',
      icon: 'nb-layout-default',
      id: 'one-column',
      selected: true,
    },
    {
      name: 'Two Column',
      icon: 'nb-layout-two-column',
      id: 'two-column',
    },
    {
      name: 'Center Column',
      icon: 'nb-layout-centre',
      id: 'center-column',
    },
  ];

  protected sidebars: any = [
    {
      name: 'Sidebar at layout start',
      icon: 'nb-layout-sidebar-left',
      id: 'start',
      selected: true,
    },
    {
      name: 'Sidebar at layout end',
      icon: 'nb-layout-sidebar-right',
      id: 'end',
    },
  ];

  protected layoutState$ = new BehaviorSubject(this.layouts[0]);
  protected sidebarState$ = new BehaviorSubject(this.sidebars[0]);

  alive = true;

  ngOnDestroy() {
    this.alive = false;
  }


  setLayoutState(state: any): any {
    this.layoutState$.next(state);
  }

  getLayoutStates(): Observable<any[]> {
    return observableOf(this.layouts);
  }

  onLayoutState(): Observable<any> {
    return this.layoutState$.asObservable();
  }

  setSidebarState(state: any): any {
    this.sidebarState$.next(state);
  }

  getSidebarStates(): Observable<any[]> {
    return observableOf(this.sidebars);
  }

  onSidebarState(): Observable<any> {
    return this.sidebarState$.asObservable();
  }
}
