export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
}

export interface Env {
  env: string;
  name: string;
  banner_header: string;
}
export interface IAppConstant {
  /* Increment this number to force update localstorage */
  currentSettingsVersion: number;
  availableEnvs: Env[];
  sravzEnvironment: any;
  apiServiceBaseUri: string;
  dataServiceBaseUri: string;
  portfolioServiceBaseUri: string;
  analyticsServiceBaseUri: string;
  quotesServiceBaseUri: string;
  analyticsSocketServiceBaseUri: string;
  blockchainServiceBase: string;
  signalRUrl: string;
  recaptchaSiteKey: string;
  clientId: string;
  clientSecret: string;
  uiv2_location: string;
}

