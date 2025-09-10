import { AssetResolver } from './asset-resolver.service';
import { AssetListComponent } from './assets.list.component';
import { AssetUploadComponent } from './assets.upload.component';
import { UserAssetResolver } from './userasset-resolver.service';
import { AssetDetailsComponent } from './asset.details.component';
import { AssetDetailsResolver } from './asset.details-resolver.service';
import { AssetsComponent } from './assets.component';


export const AssetRoutes = [
  { path: 'all', component: AssetsComponent, resolve: {assets: AssetResolver}},
  { path: 'list', component: AssetListComponent, resolve: {assets: AssetResolver, userassets: UserAssetResolver }},
  { path: 'details', component: AssetDetailsComponent, resolve: {asset: AssetDetailsResolver}},
  { path: 'upload', component: AssetUploadComponent, resolve: {assets: AssetResolver}}
];
