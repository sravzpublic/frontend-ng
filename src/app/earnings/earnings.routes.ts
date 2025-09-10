import { AssetResolver } from '../assets/asset-resolver.service';
import { EarningsResolver } from './earnings-resolver.service';
import { EarningsComponent } from './earnings-component';
import { EarningsDetailsComponent } from './earnings-details-component';
import { EarningsDetailsResolver } from './earnings-details-resolver.service';



export const EarningsRoutes = [
  {
    path: 'earnings', component: EarningsComponent, resolve: {
      earnings: EarningsResolver,
      assets: AssetResolver,
    }
  },
  { path: 'earnings-details', component: EarningsDetailsComponent, resolve: { earningsDetails: EarningsDetailsResolver } }
];
