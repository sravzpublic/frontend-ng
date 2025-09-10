import { FuturesComponent } from './futures.component';
import { FuturesResolver } from './futures-resolver.service';

export const FuturesRoutes = [
  { path: 'all', component: FuturesComponent, resolve: {futureStats: FuturesResolver}}
];
