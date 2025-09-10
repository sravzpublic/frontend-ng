 import { AssetResolver } from '../assets/asset-resolver.service';
import { SpreadAnalysisComponent } from './spread-analysis.component';


export const SpreadAnalysisRoutes = [
  { path: 'all', component: SpreadAnalysisComponent, resolve: {assets: AssetResolver}}
];
