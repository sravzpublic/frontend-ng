import { AssetResolver } from '../assets/asset-resolver.service';
import { CalendarComponent } from './calendar.component';
import { CalendarResolver } from './economic-resolver.service';
import { USFedCalendarResolver } from './economic-usfed-resolver.service';

export const EconomicsRoutes = [
  { path: 'calendar', component: CalendarComponent, resolve: {events: CalendarResolver, usFedEvents: USFedCalendarResolver}}
];
