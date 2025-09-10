import { OptionComponent } from './option-component';
import { OptionResolver } from './option-resolver.service';
import { OptionTickerResolver } from './option-ticker-resolver.service';

export const OptionRoutes = [
  { path: 'option', component: OptionComponent, resolve: {
    optionTickers: OptionTickerResolver,
    option: OptionResolver,
  }},
];
