import { BondComponent } from './bond-component';
import { BondResolver } from './bond-resolver.service';
import { BondTickerResolver } from './bond-ticker-resolver.service';

export const BondRoutes = [
  { path: 'bond', component: BondComponent, resolve: {
    bonds: BondResolver,
    bondTickers: BondTickerResolver

  }},
];
