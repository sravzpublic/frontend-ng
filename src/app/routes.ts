import { Routes } from '@angular/router';
import { Error404Component } from './errors/404.component';
import { SettingsComponent } from './settings/settings.component';
import { ContactUSComponent } from './contactus/contactus.component';
import { AboutComponent } from './about/about.component';
import { TrainingComponent } from './training/trainig.component';
import { AuthGuard } from './@auth/auth.guard';
import { CareersComponent } from './careers/careers.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './@auth/admin.guard';
import { Error401Component } from './errors/401.component';
import { PrivacyComponent } from './privacy/privacy.component';

export const appRoutes: Routes = [
  { path: 'auth', loadChildren: () => import('app/@auth/auth.module').then(m => m.AuthModule)},
  { path: 'home', loadChildren: () => import('app/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: 'contactus', component: ContactUSComponent},
  { path: 'about', component: AboutComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'training', component: TrainingComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  { path: 'careers', component: CareersComponent},
  { path: 'asset', loadChildren: () => import('app/assets/assets.module').then(m => m.AssetModule), canActivate: [AuthGuard]},
  { path: 'spreadanalysis', loadChildren: () => import('app/spread-analysis/spread-analysis.module').then(m => m.SpreadAnalysisModule), canActivate: [AuthGuard]},
  { path: 'portfolio', loadChildren: () => import('app/portfolios/portfolio.module')
  .then(m => m.PortfolioModule), canActivate: [AuthGuard]},
  { path: 'quotes', loadChildren: () => import('app/quotes/quotes.module').then(m => m.QuoteModule), canActivate: [AuthGuard]},
  { path: 'user', loadChildren: () => import('app/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard]},
  { path: 'upload', loadChildren: () => import('app/upload/upload.module').then(m => m.UploadModule), canActivate: [AuthGuard]},
  { path: 'marketindex', loadChildren: () => import('app/market-index/market-index.module')
  .then(m => m.MarketIndexModule), canActivate: [AuthGuard]},
  { path: 'forex', loadChildren: () => import('app/forex/forex.module').then(m => m.ForexModule), canActivate: [AuthGuard]},
  { path: 'futures', loadChildren: () => import('app/futures/futures.module').then(m => m.FuturesModule), canActivate: [AuthGuard]},
  { path: 'analytics', loadChildren: () => import('app/analytics/analytics.module').then(m => m.AnalyticsModule), canActivate: [AuthGuard]},
  { path: 'rates', loadChildren: () => import('app/rates/rates.module').then(m => m.RatesModule), canActivate: [AuthGuard]},
  { path: 'crypto', loadChildren: () => import('app/crypto/crypto.module').then(m => m.CryptoModule), canActivate: [AuthGuard]},
  { path: 'economics', loadChildren: () => import('app/economics/economics.module').then(m => m.EconomicsModule), canActivate: [AuthGuard]},
  { path: 'feeds', loadChildren: () => import('app/feed/feed.module').then(m => m.FeedModule), canActivate: [AuthGuard]},
  { path: 'earnings', loadChildren: () => import('app/earnings/earnings.module').then(m => m.EarningsModule), canActivate: [AuthGuard]},
  { path: 'fundamentals', loadChildren: () => import('app/fundamentals/fundamental.module')
  .then(m => m.FundamentalsModule), canActivate: [AuthGuard]},
  { path: 'insider-trades', loadChildren: () => import('app/insider-trading/insider-trading.module')
  .then(m => m.InsiderTradingModule), canActivate: [AuthGuard]},
  { path: 'ytd', loadChildren: () => import('app/ytd/ytd.module').then(m => m.YTDModule), canActivate: [AuthGuard]},
  { path: 'etfs', loadChildren: () => import('app/etfs/etf.module').then(m => m.ETFModule), canActivate: [AuthGuard]},
  { path: 'bond', loadChildren: () => import('app/bond/bond.module').then(m => m.BondModule), canActivate: [AuthGuard]},
  { path: 'alert', loadChildren: () => import('app/alert/alert.module').then(m => m.AlertModule), canActivate: [AuthGuard]},
  { path: 'option', loadChildren: () => import('app/option/option.module').then(m => m.OptionModule), canActivate: [AuthGuard]},
  { path: 'mutualfunds', loadChildren: () => import('app/mutual-funds/mutual-funds.module')
  .then(m => m.MutualFundsModule), canActivate: [AuthGuard]},
  { path: 'ibkr', loadChildren: () => import('app/ibkr/ibkr.module')
  .then(m => m.IBKRModule), canActivate: [AuthGuard]},
  { path: 'spread', loadChildren: () => import('app/spread-analysis/spread-analysis.module')
  .then(m => m.SpreadAnalysisModule), canActivate: [AuthGuard]},
  { path: 'ig', loadChildren: () => import('app/ignite-ui/ignite-ui.module').then(m => m.IgxDemoModule), canActivate: [AuthGuard]},
  { path: '404', component: Error404Component },
  { path: '401', component: Error401Component },
  { path: '', redirectTo: 'ig', pathMatch: 'full' },
  { path: '**', redirectTo: 'ig' },
];
