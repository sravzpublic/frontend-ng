import { HomeComponent } from './home.component';
import { USIndexQuoteResolver } from '../quotes/us-index-quotes-resolver.service';

export const HomeRoutes = [
  { path: '', component: HomeComponent, resolve: {indexQuotes: USIndexQuoteResolver}}
];
