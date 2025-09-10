/* Demo components */
import { MapBindingDataJsonPointsComponent } from './map-binding-data-json-points.component';
import { ReactiveFormsSampleComponent } from './reactive-forms.component';
import { MapCasesComponent } from './map-cases/map-cases.component';
import { ListCasesComponent } from './list-cases/list-cases.component';
import { MarketsDashboardComponent } from './markets-dashboard/markets.dashboard.component';
import { ListSample4Component } from './list-sample-4/list-sample-4.component';
import { BostonMarathonComponent } from './grid/grid-boston-marathon/grid.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { MainComponent } from './main/main.component';
import { DashboardResolver } from './main/dashboard-resolver.service';
import { Routes } from "@angular/router";

export const IgniteUIRoutes: Routes = [
    /* Demo routes */
    { path: 'dropdown', component: ReactiveFormsSampleComponent},
    { path: 'map', component: MapBindingDataJsonPointsComponent},
    { path: 'Loading', component: SplashscreenComponent, data: { text: 'splash-screen' } },
    { path: 'markets-dashboard', component: MarketsDashboardComponent, data: { text: 'markets-dashboard' },
    resolve: {dashboardData: DashboardResolver} },
    { path: 'main', component: MainComponent, data: { text: 'main' } },
    { path: 'map-cases', component: MapCasesComponent, data: { text: 'active-cases-map' } },
    { path: 'list-cases', component: ListCasesComponent, data: { text: 'list-cases' } },
    { path: 'list-sample-4', component: ListSample4Component, data: { text: 'list-sample-4' } },
    { path: 'grid-boston-marathon', component: BostonMarathonComponent, data: { text: 'list-sample-4' } },
    { path: '', redirectTo: 'markets-dashboard', pathMatch: 'full' },
];
