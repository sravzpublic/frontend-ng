import { IndexComponent } from './index.component';
import { AssetResolver } from '../assets/asset-resolver.service';
import { IndexResolver } from './index-resolver.service';
import { ExchangeResolver } from './exchange-resolver.service';
import { USIndexQuoteResolver } from '../quotes/us-index-quotes-resolver.service';

export const IndexRoutes = [
  { path: 'index', component: IndexComponent, resolve: {assets: IndexResolver, indexQuotes: USIndexQuoteResolver}},
  { path: 'exchange', component: IndexComponent, resolve: {assets: ExchangeResolver}}
];
