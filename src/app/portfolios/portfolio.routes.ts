import { PortfolioResolver } from './portfolio-resolver.service';
import { PortfolioListComponent } from './portfolio.list.component';
import { PortfolioCreateComponent } from './portfolio.create.component';
import { USIndexQuoteResolver } from '../quotes/us-index-quotes-resolver.service';
import { CurrencyQuoteResolver } from '../quotes/currency-quotes-resolver.service';
import { RatesQuoteResolver } from '../quotes/rates-quotes-resolver.service';
import { CryptoQuoteResolver } from '../quotes/crypto-quotes-resolver.service';
import { VixQuoteResolver } from '../quotes/vix-quotes-resolver.service';
import { FutureQuoteResolver } from '../quotes/future-quotes-resolver.service';
import { ETFQuoteResolver } from '../quotes/etf-quotes-resolver.service';

export const PortfolioRoutes = [

  { path: 'list', component: PortfolioListComponent, resolve: {portfolios: PortfolioResolver}},
  { path: 'create', component: PortfolioCreateComponent, resolve: {futureQuotes: FutureQuoteResolver,
    indexQuotes: USIndexQuoteResolver, currencyQuotes: CurrencyQuoteResolver,
    ratesQuotes: RatesQuoteResolver, cryptoQuotes: CryptoQuoteResolver, 
    vixQuotes: VixQuoteResolver, etfQuotes: ETFQuoteResolver}}
];
