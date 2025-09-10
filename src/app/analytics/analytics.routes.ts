import { AnalyticsComponent } from './analytics.component';
import { AnalyticsResolver } from './analytics-resolver.service';
import { UserAssetResolver } from '../assets/userasset-resolver.service';
import { PortfolioResolver } from '../portfolios/portfolio-resolver.service';

export const AnalyticsRoutes = [
  { path: 'all', component: AnalyticsComponent, resolve: {assets: AnalyticsResolver,
    userassets: UserAssetResolver, portfolios: PortfolioResolver}}
];
