import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from '../asset/asset.component';

import { AssetSelectorComponent } from '../asset/asset.selector.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AssetTearsheetComponent } from '../tearsheet/asset.tearsheet.component';

import { PortfolioSelectorComponent } from '../asset/portfolio.selector.component';
import { PortfolioTearsheetComponent } from '../tearsheet/portfolio.tearsheet.component';
import { NumericEditorComponent } from '../common/numeric-editor.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IndexComponentsComponent } from '../tearsheet/index.components.component';
import {
    IgxAutocompleteModule,
    IgxButtonModule,
    IgxDropDownModule,
    IgxInputGroupModule,
    IgxDatePickerModule,
    IgxDialogModule,
    IgxIconModule,
    IgxSelectModule,
    IgxTimePickerModule,
    IgxRippleModule,
    IgxComboModule,
    IgxTabsModule,
    IgxGridModule,
} from '@infragistics/igniteui-angular';
import { IgxGeographicMapModule } from 'igniteui-angular-maps';
import { AutocompletePipeContains } from '../pipe/auto-complete-contains-pipe';
import { AutocompleteGroupPipeContains } from '../pipe/auto-complete-group-contains-pipe';
import { QuoteService } from '../quotes/quotes.service';
import { QuoteResolver } from '../quotes/quotes-resolver.service';
import { USIndexQuoteResolver } from '../quotes/us-index-quotes-resolver.service';
import { RatesQuoteResolver } from '../quotes/rates-quotes-resolver.service';
import { CurrencyQuoteResolver } from '../quotes/currency-quotes-resolver.service';
import { CryptoQuoteResolver } from '../quotes/crypto-quotes-resolver.service';
import { VixQuoteResolver } from '../quotes/vix-quotes-resolver.service';
import { IgxDemoModule } from '../ignite-ui/ignite-ui.module';
import { FutureQuoteResolver } from '../quotes/future-quotes-resolver.service';
import { ETFQuoteResolver } from '../quotes/etf-quotes-resolver.service';

@NgModule({
    imports: [
        FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        IgxAutocompleteModule,
        IgxButtonModule,
        IgxDropDownModule,
        IgxInputGroupModule,
        IgxDatePickerModule,
        IgxDialogModule,
        IgxIconModule,
        IgxSelectModule,
        IgxTimePickerModule,
        IgxRippleModule,
        IgxComboModule,
        IgxGeographicMapModule,
        FormsModule,
        IgxTabsModule,
        IgxGridModule,
        IgxDemoModule
    ],
    declarations: [
        AssetComponent,
        AssetSelectorComponent,
        PortfolioSelectorComponent,
        AssetTearsheetComponent,
        PortfolioTearsheetComponent,
        NumericEditorComponent,
        IndexComponentsComponent,
        AutocompletePipeContains,
        AutocompleteGroupPipeContains

    ],
    exports: [
        AssetComponent,
        AssetSelectorComponent,
        PortfolioSelectorComponent,
        AssetTearsheetComponent,
        PortfolioTearsheetComponent,
        NumericEditorComponent,
        IndexComponentsComponent,
        AutocompletePipeContains,
        AutocompleteGroupPipeContains,
    ],
    providers: [
        QuoteService,
        QuoteResolver,
        USIndexQuoteResolver,
        RatesQuoteResolver,
        CurrencyQuoteResolver,
        FutureQuoteResolver,
        ETFQuoteResolver,
        CryptoQuoteResolver,
        VixQuoteResolver
    ]
})
export class SharedModule { }


