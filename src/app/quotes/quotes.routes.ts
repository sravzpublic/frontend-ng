import { QuoteListComponent } from './quotes.list.component';
import { USIndexQuoteResolver } from './us-index-quotes-resolver.service';
import { CurrencyQuoteResolver } from './currency-quotes-resolver.service';
import { CryptoQuoteResolver } from './crypto-quotes-resolver.service';
import { RatesQuoteResolver } from './rates-quotes-resolver.service';
import { VixQuoteResolver } from './vix-quotes-resolver.service';
import { FutureQuoteResolver } from './future-quotes-resolver.service';
import { ETFQuoteResolver } from './etf-quotes-resolver.service';


export const QuoteRoutes = [
  { path: 'list', component: QuoteListComponent, resolve: {futureQuotes: FutureQuoteResolver,
    indexQuotes: USIndexQuoteResolver, currencyQuotes: CurrencyQuoteResolver,
    ratesQuotes: RatesQuoteResolver, cryptoQuotes: CryptoQuoteResolver, 
    vixQuotes: VixQuoteResolver, etfQuotes: ETFQuoteResolver
  }}
];
