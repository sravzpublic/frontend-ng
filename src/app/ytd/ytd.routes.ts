import { AssetResolver } from '../assets/asset-resolver.service';
import { ETFTickerResolver } from '../etfs/etf-ticker-resolver.service';
import { MutualFundsTickerResolver } from '../mutual-funds/mutual-funds-ticker-resolver.service';
import { YTDCodesResolver } from './ytd-codes-resolver';
import { YTDComponent } from './ytd-component';

export const YTDRoutes = [
  {
    path: 'all', component: YTDComponent, resolve: {
      assets: AssetResolver,
      ytdCodes: YTDCodesResolver,
      mfTickers: MutualFundsTickerResolver,
      etfTickers: ETFTickerResolver
    }
  },
];
