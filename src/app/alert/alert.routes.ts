import { AlertComponent } from './alert-component';
import { AlertResolver } from './alert-resolver.service';


export const AlertRoutes = [
  { path: 'alert', component: AlertComponent, resolve: {
    alerts: AlertResolver
  }},
];
