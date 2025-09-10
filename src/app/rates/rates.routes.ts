import { RatesComponent } from './rates.component';
import { AssetResolver } from '../assets/asset-resolver.service';
import { RatesResolver } from './rates-resolver.service';
import { MortgageRatesResolver } from './mortgage-rates-resolver.service';
import { MortgageRatesComponent } from './mortgage-rates.component';

export const RatesRoutes = [
  { path: 'all', component: RatesComponent, resolve: {assets: RatesResolver}},
  { path: 'mortgage', component: MortgageRatesComponent, resolve: {quotes: MortgageRatesResolver}}
];
