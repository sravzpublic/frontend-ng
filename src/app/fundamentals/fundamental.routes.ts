import { FundamentalsComponent } from './fundamental-component';
import { FundamentalsResolver } from './fundamental-resolver.service';
import { StockTickerResolver } from './stocks-ticker-resolver.service';

export const FundamentalsRoutes = [
  { path: 'fundamentals', component: FundamentalsComponent, resolve: {
    fundamentals: FundamentalsResolver,
    stockTickers: StockTickerResolver

  }},
];
