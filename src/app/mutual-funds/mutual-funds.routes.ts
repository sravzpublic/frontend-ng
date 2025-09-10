import { MutualFundsComponent } from './mutual-funds-component';
import { MutualFundsResolver } from './mutual-funds-resolver.service';
import { MutualFundsTickerResolver } from './mutual-funds-ticker-resolver.service';

export const MutualFundsRoutes = [
  { path: 'mutualfunds', component: MutualFundsComponent, resolve: {
    mfFundamental: MutualFundsResolver,
    mfTickers: MutualFundsTickerResolver

  }},
];
