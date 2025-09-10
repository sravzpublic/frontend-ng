import { InsiderTradingComponent } from './insider-trading-component';
import { InsiderTradingResolver } from './insider-trading-resolver.service';

export const InsiderTradingRoutes = [
  { path: 'all', component: InsiderTradingComponent, resolve: {
    fundamentals: InsiderTradingResolver

  }},
];
