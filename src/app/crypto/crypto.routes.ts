import { CryptoComponent } from './crypto.component';
import { AssetResolver } from '../assets/asset-resolver.service';
import { CryptoResolver } from './crypto-resolver.service';
import { CryptoTearsheetComponent } from './cryptotearsheet.component';

export const CryptoRoutes = [
  { path: 'all', component: CryptoComponent, resolve: {assets: CryptoResolver}},
  { path: 'analysis', component: CryptoTearsheetComponent}
];
