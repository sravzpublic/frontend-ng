import { AssetResolver } from '../assets/asset-resolver.service';
import { FeedComponent } from './feed-component';
import { FeedResolver } from './feed-resolver.service';



export const FeedRoutes = [
  { path: 'feed', component: FeedComponent, resolve: {rssFeedEntries: FeedResolver}}
];
