import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { WindowRef } from './window.service';
import { Injectable } from '@angular/core';

/** A router wrapper, adding extra functions. */
@Injectable()
export class RouterExtService {

    private previousUrl: string = undefined;
    private currentUrl: string = undefined;

    constructor(public router: Router,
        private windowService: WindowRef) {
        this.currentUrl = this.router.url;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;
            }
        });
    }

    public getPreviousUrl() {
        return this.previousUrl;
    }

    public getCurrentUrl() {
        return this.currentUrl;
    }

    public getCurrentPath() {
        // returns anything after / for Eg: /marketindex/all
        return this.windowService.nativeWindow.location.pathname;
    }
}
