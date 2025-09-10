import { ForexComponent } from './forex.component';
import { AssetResolver } from '../assets/asset-resolver.service';
import { ForexResolver } from './forex-resolver.service';

export const ForexRoutes = [
  { path: 'all', component: ForexComponent, resolve: {assets: ForexResolver}}
];
