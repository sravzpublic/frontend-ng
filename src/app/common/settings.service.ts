import { Injectable } from '@angular/core';
import { PersistanceService } from './persistance.service';
import { ToastrService } from 'ngx-toastr';
import { IAppConstant } from './appconstant.model';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable()
export class SettingsService {
  desktopService: any;
  /* URLs which do not require authenticated user */
  openUrls: string[];
  /* Localstorage App Setting functions */
  appSettings: any;
  sravzAppConstants: IAppConstant;


  constructor(private persistanceService: PersistanceService,
    private toastr: ToastrService,
    private location: Location) {
    this.appSettings = this.persistanceService.get('ls.appSettings');
    this.sravzAppConstants = {
      /* Increment this number to force update localstorage */
      currentSettingsVersion: 2.0097,
      availableEnvs: [
        { env: 'SravzLocal', name: 'Sravz Local', banner_header: 'Sravz Local' },
        { env: 'SravzDev', name: 'Sravz Dev', banner_header: 'Sravz Dev' },
        { env: 'SravzStaging', name: 'Sravz Staging', banner_header: 'Sravz Staging' },
        { env: 'SravzDevUnMinified', name: 'Sravz Dev UnMinified', banner_header: 'Sravz Dev UnMinified' },
        { env: 'SravzProd', name: 'Sravz Prod', banner_header: 'Sravz' }],
      sravzEnvironment: null,
      apiServiceBaseUri: null,
      dataServiceBaseUri: null,
      portfolioServiceBaseUri: null,
      analyticsServiceBaseUri: null,
      quotesServiceBaseUri: null,
      analyticsSocketServiceBaseUri: null,
      blockchainServiceBase: null,
      signalRUrl: null,
      recaptchaSiteKey: null,
      clientId: null,
      clientSecret: null,
      uiv2_location: null
    };

    this.openUrls = ['/home', '/login', '/logout', '/about', '/signup', '/refresh', '/tokens', '/associate'];

  }

  /* Sravz App Settings */
  setWebEnvironment() {
    if (location.hostname.match(/(localhost|127.0.0,.1|vagrant.sravz.com)/)) {
      this.setDesktopEnvironment('SravzLocal');
    } else if (location.hostname.match(/dev/)) {
      this.setDesktopEnvironment('SravzDev');
    } else if (location.hostname.match(/staging/)) {
      this.setDesktopEnvironment('SravzStaging');
    } else if (location.hostname.match(/(data.sravz.com|sravz.com|)/)) {
      this.setDesktopEnvironment('SravzProd');
    } else {
      this.toastr.error('Unknown Sravz Web Environment', 'Error', {
        positionClass: 'toast-bottom-center' });
    }
  }

  setDesktopEnvironment(environment_to_use) {
    if (this.sravzAppConstants) {
      let _apiServiceBaseUri, 
        _analyticsServiceBase,
       _analyticsSocketServiceBase,  _recaptchaSiteKey, _sravzEnvironment,
       _blockchainServiceBase, _clientId, _clientSecret,
       _uiv2_location = null;
      switch (environment_to_use) {
        case 'SravzDev':
          _apiServiceBaseUri = 'https://apidev.sravz.com:8082/';
          _analyticsServiceBase = 'https://analyticsdev.sravz.com';
          _analyticsSocketServiceBase = 'wss://analyticsdev.sravz.com';
          _recaptchaSiteKey = '6LcttRATAAAAAI6BLnGfrlswvvgRPEnre9wj2phU';
          _blockchainServiceBase = 'https://ethstaging.sravz.com';
          /* Only for testing in dev */
          if (/datadev/.test(location.hostname)) {
            _clientId = 'SravzDev';
          } else {
            _clientId = 'SravzDevUnMinified';
          }
          _clientSecret = 'O6vUGsAEe3iROCoHv0HfhK1j+l990Bs0Hy4YokF3Dkk=';
          _uiv2_location = '/public/dist';
          break;
        case 'SravzStaging':
          _apiServiceBaseUri = 'https://apidev.sravz.com:8082/';
          _analyticsServiceBase = 'https://analyticsstaging.sravz.com';
          _analyticsSocketServiceBase = 'wss://analyticsstaging.sravz.com';
          _recaptchaSiteKey = '6LcttRATAAAAAI6BLnGfrlswvvgRPEnre9wj2phU';
          _blockchainServiceBase = 'https://ethstaging.sravz.com';
          _clientId = 'SravzStaging';
          /* Only for testing in staging */
          if (/datastaging/.test(location.hostname)) {
            _clientId = 'SravzStaging';
          } else {
            _clientId = 'SravzStagingUnMinified';
          }
          _clientSecret = 'DqEAJ5zR+DSJ9uaSWTK1x7kAxsNP0WeK/ocXIFCNUGc=';
          _uiv2_location = '/public/dist';
          break;
        case 'SravzProd':
          _apiServiceBaseUri = 'https://api.sravz.com/';
          _analyticsServiceBase = 'https://analytics.sravz.com';
          _analyticsSocketServiceBase = 'wss://analytics.sravz.com';
          _blockchainServiceBase = 'https://ethstaging.sravz.com';
          _recaptchaSiteKey = '6LcttRATAAAAAI6BLnGfrlswvvgRPEnre9wj2phU';
          _clientId = 'SravzProd';
          _clientSecret = 'QK/btOjEy+Heb3nUG9s92u5MDL0QP7LLqTDEB7Kf1YY=';
          _uiv2_location = '/public/dist';
          break;
        // defaults to SravzLocal
        default:
          // Tried api.vagrant.sravz.com but need to check how to configure domain
          // name in IIS Express
          // tslint:disable-next-line:max-line-length
          _apiServiceBaseUri = 'https://localhost:44300/';
          _analyticsServiceBase = 'http://localhost:8080';
          _analyticsSocketServiceBase = 'ws://localhost:8080';
          _blockchainServiceBase = 'https://eth.vagrant.sravz.com';
          _recaptchaSiteKey = '6Lf6bQ8UAAAAAF6EK8QqMHK1cgzg-e--G7hJ7-jK';
          _clientId = 'SravzLocal';
          _clientSecret = 'pRfZndiGqX/Dviz85xkawsnwR7HxEr6iZ+wNMOg5mZY=';
          _uiv2_location = 'http://localhost:4200/';
      }
      _sravzEnvironment = this.sravzAppConstants.availableEnvs.find((item) => item.env === _clientId);
      this.sravzAppConstants.sravzEnvironment = environment_to_use;
      this.sravzAppConstants.apiServiceBaseUri = _apiServiceBaseUri;
      this.sravzAppConstants.dataServiceBaseUri = environment.DATA_SERVICE_BASE;
      this.sravzAppConstants.portfolioServiceBaseUri = environment.PORTFOLIO_SERVICE_BASE;
      this.sravzAppConstants.analyticsServiceBaseUri = environment.ANALYTICS_SERVICE_BASE;
      this.sravzAppConstants.quotesServiceBaseUri = environment.QUOTES_SERVICE_BASE;
      this.sravzAppConstants.analyticsSocketServiceBaseUri = environment.ANALYTICS_SOCKET_SERVICE_BASE;
      this.sravzAppConstants.blockchainServiceBase = _blockchainServiceBase;
      this.sravzAppConstants.signalRUrl = _apiServiceBaseUri + '/signalr/';
      this.sravzAppConstants.recaptchaSiteKey = _recaptchaSiteKey;
      this.sravzAppConstants.sravzEnvironment = _sravzEnvironment;
      this.sravzAppConstants.clientId = _clientId;
      this.sravzAppConstants.clientSecret = _clientSecret;
      this.sravzAppConstants.uiv2_location = _uiv2_location;
    }
  }

  getAppConstants(): IAppConstant {
    /*     if (this.isElectron()) {
          this.setDesktopEnvironment('SravzLocal');
        } else {
          this.setWebEnvironment();
        } */
    this.setWebEnvironment();
    return this.sravzAppConstants;
  }

  areAppSettingsUpdated() {
    return this.appSettings && this.appSettings.version && this.appSettings.version < this.sravzAppConstants.currentSettingsVersion;
  }

  createNewAppSettings() {
    this.appSettings = {};
    this.appSettings.version = this.sravzAppConstants.currentSettingsVersion;
    this.appSettings.serviceBase = this.sravzAppConstants.apiServiceBaseUri;
    this.appSettings.portfolioServiceBase = this.sravzAppConstants.portfolioServiceBaseUri;
    this.appSettings.clientId = this.sravzAppConstants.clientId;
    this.appSettings.graphs = {
      'defaultNoYear': { id: 1, value: 1 },
      'description': 'Default number of years to use to plot the graphs',
      'availableYears': [
        { id: 1, value: 1 }, { id: 2, value: 2 }, { id: 3, value: 3 },
        { id: 4, value: 5 }, { id: 5, value: 10 }, { id: 6, value: 25 },
        { id: 7, value: 50 }, { id: 8, value: 100 }
      ]
    };
    this.appSettings.priceUpdateInterval = 15;
    this.persistanceService.clearAll();
    this.persistanceService.set('ls.appSettings', this.appSettings);
  }

  updateAppSettings() {
    if (this.areAppSettingsUpdated()) {
      this.createNewAppSettings();
    } else {
      /* Update all updatable settings */
      this.setMobileDeviceSettings();
    }
  }

  getAppSettings() {
    if (this.appSettings && !this.areAppSettingsUpdated()) {
      return this.appSettings;
    } else {
      this.createNewAppSettings();
    }
    return this.appSettings;
  }

  setAppSettings(appSettings) {
    /* Add validaations here */
    this.persistanceService.set('ls.appSettings', appSettings);
  }

  setMobileDeviceSettings() {
    const appSettings = this.getAppSettings();
    this.setAppSettings(appSettings);
  }


  /*   isElectron() {
      // Renderer process
      if (typeof window !== 'undefined' && typeof window['process'] === 'object' && window['process']['type'] === 'renderer') {
        return true;
      }

      // Main process
      if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process['versions']['electron']) {
        return true;
      }

      // Detect the user agent when the `nodeIntegration` option is set to true
      if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
      }

      return false;
    } */

}
