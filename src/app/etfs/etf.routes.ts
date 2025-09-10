import { ETFComponent } from './etf-component';
import { ETFResolver } from './etf-resolver.service';
import { ETFTickerResolver } from './etf-ticker-resolver.service';

export const ETFRoutes = [
  { path: 'etfs', component: ETFComponent, resolve: {
    etfs: ETFResolver,
    etfTickers: ETFTickerResolver

  }},
];
