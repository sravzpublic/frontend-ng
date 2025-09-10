// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';
// import { UpgradeModule, downgradeInjectable } from '@angular/upgrade/static';
// import 'core-js/es7/reflect';
// import 'core-js/client/shim';
// import 'zone.js';
// import './icons';
// import 'hammerjs';
// // declare var angular: angular.IAngularStatic;


// if (environment.production) {
//   enableProdMode();
// }

// /* platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err)); */

// platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {

//   // angular.module('app').factory('AuthService', downgradeInjectable(AuthService));

//   const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
//   upgrade.bootstrap(document.documentElement, ['app']);
// });

/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
