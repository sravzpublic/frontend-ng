import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IgniteUIRoutes } from './ignite-ui.routes';
import { MapBindingDataJsonPointsComponent } from './map-binding-data-json-points.component';
import { ReactiveFormsSampleComponent } from './reactive-forms.component';
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
  IgxCardModule,
  IgxExpansionPanelModule,
  IgxBottomNavModule,
  IgxAvatarModule,
  IgxButtonGroupModule,
  IgxTabsModule,
  IgxNavbarModule,
  IgxListModule,
  IgxDividerModule,
  IgxTooltipModule,
  IgxSwitchModule,
  IgxProgressBarModule,
  IgxFilterModule,
  IgxGridModule,
  IgxDateRangePickerModule,
  IgxExcelExporterService,
  IgxCsvExporterService,
  IgxToastModule,
  IgxSliderModule,
  IgxActionStripModule,
  IgxToggleModule,
  IgxCheckboxModule
} from '@infragistics/igniteui-angular';

import {
  IgxDataChartCoreModule, IgxDataChartCategoryModule,
  IgxDataChartAnnotationModule, IgxCalloutLayerModule, IgxCrosshairLayerModule,
  IgxFinalValueLayerModule, IgxLegendModule, IgxTimeXAxisModule,
  IgxNumericXAxisModule, IgxCategoryXAxisModule, IgxFinancialChartModule,
  IgxScatterLineSeriesModule, IgxLineSeriesModule, IgxCategoryToolTipLayerModule,
  IgxDataChartInteractivityModule,
  IgxSparklineCoreModule,
  IgxSparklineModule,
  IgxCategoryChartModule,
  IgxPieChartModule,
} from 'igniteui-angular-charts';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component'
import { IgxGeographicMapCoreModule, IgxGeographicMapModule } from 'igniteui-angular-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCasesComponent } from './list-cases/list-cases.component';
import { MapCasesComponent } from './map-cases/map-cases.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import { MarketsDashboardComponent } from './markets-dashboard/markets.dashboard.component';
import { ListSample4Component } from './list-sample-4/list-sample-4.component';
// import { IgxPreventDocumentScrollModule } from './directives/prevent-scroll.directive';
import { BostonMarathonComponent } from './grid/grid-boston-marathon/grid.component';
import { WorldIndicesGridComponent } from './grid/grid-world-indices/grid.component';
import { FinancialChartOverviewComponent } from './financial-chart/financial-chart-overview.component';
import { FinancialDataService } from './services/financial-data.service';
import { AssetsGridComponent } from './grid/grid-assets/grid.component';
import { ExpansionPanelCombinedChartsComponent } from './layout-expansion/charts/combined-chart';
import { MapTypeScatterBubbleSeriesComponent } from './geo-map-type-scatter-bubble-series/map-type-scatter-bubble-series.component';
import { GridQuotesComponent } from './grid/grid-quotes/grid.quotes.component';
import { RSSFeedGridComponent, PipeWithoutTownFrom } from './grid/grid-rss-feed/grid.component';
import { InsiderTradesGridComponent } from './grid/grid-insider-trades/grid.component';
import { GridEconomicCalenderComponent } from './grid/grid-economic-calender/grid-economic-calender..component';
import { GridPortfoliosComponent } from './grid/grid-portfolios/grid-portfolios.component';
import { EarningsGridComponent } from './grid/grid-earnings/grid.component';
import { EarningsDetailsGridComponent } from './grid/grid-earnings-details/grid.component';
import { FundamentalsGridComponent } from './grid/grid-fundamentals/grid.component';
import { YTDGridComponent } from './grid/grid-ytd/grid.component';
import { ETFGridComponent } from './grid/grid-etf/grid.component';
import { StockTickersGridComponent } from './grid/grid-stock-tickers/grid.component';
import { YtdCodesGridComponent } from './grid/grid-ytd-codes/grid.component';
import { ETFTickersGridComponent } from './grid/grid-etf-tickers/grid.component';
import { BondTickersGridComponent } from './grid/grid-bond-tickers/grid.component';
import { MutualFundsGridComponent } from './grid/grid-mf-tickers/grid.component';
import { PortfolioCreateGridComponent } from './grid/grid-portfolio-create/portfolio.create.component';
import { SharedUIModule } from '../shared/shared-ui-module';
import { PortfolioBulkCreateGridComponent } from './grid/grid-portfolio-bulk-create/portfolio.bulk.create.component';
import { PasteHandlerDirective } from './grid/grid-portfolio-bulk-create/paste-handler.directive';
import { IndexComponentsCategoryChartComponent } from './category-chart/chart.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipe/pipes.module';
import { DashboardResolver } from './main/dashboard-resolver.service';
import { DashboardService } from './main/dashboard.service';
import { GridPortfoliosAssestsComponent } from './grid/grid-portfolios-assests/grid-portfolios-assests.component';
import { GridIndexAssetsComponent } from './grid/grid-index-assets/grid-index-assets.component';
import { GridMortgageRateComponent } from './grid/grid-mortgage-rate/grid-mortgage-rate.component';
import { GridUsersAssetsComponent } from './grid/grid-users-assets/grid-users-assets.component';
import { BondGridComponent } from './grid/grid-bond/grid.component';
import { OptionGridComponent } from './grid/grid-option/grid.component';
import { FinJSDemoComponent } from './grid/grid-finjs/main.component';
import { ControllerComponent } from './grid/grid-finjs/controllers.component';
import { GridFinJSComponent } from './grid/grid-finjs/grid-finjs.component';
import { SignalRService } from './grid/grid-finjs/services/signal-r.service';
import { AnalyticsService } from '../analytics.service';
import { AlertsGridComponent } from './grid/grid-alerts/grid.component';
import { GridUsFedCalenderComponent } from './grid/grid-usfed-calender/grid-usfed-calender..component';
import { GridFutureStatsCalenderComponent } from './grid/grid-futurestats-calender/grid-futurestats-calender.component';
import { MutualFundGridComponent } from './grid/grid-mutual-fund/grid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(IgniteUIRoutes),
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
    IgxGeographicMapCoreModule,
    IgxButtonGroupModule,
    IgxTabsModule,
    IgxGeographicMapModule,
    IgxRippleModule,
    IgxListModule,
    IgxCardModule,
    IgxExpansionPanelModule,
    IgxBottomNavModule,
    IgxAvatarModule,
    IgxRippleModule,
    IgxDataChartCoreModule,
    IgxDataChartCategoryModule,
    IgxDataChartAnnotationModule,
    IgxCalloutLayerModule,
    IgxCrosshairLayerModule,
    IgxFinalValueLayerModule,
    IgxLegendModule,
    IgxTimeXAxisModule,
    IgxNumericXAxisModule,
    IgxCategoryXAxisModule,
    IgxFinancialChartModule,
    IgxCardModule,
    IgxDividerModule,
    IgxScatterLineSeriesModule,
    IgxLineSeriesModule,
    IgxTooltipModule,
    IgxSwitchModule,
    IgxProgressBarModule,
    IgxCategoryToolTipLayerModule,
    IgxDataChartInteractivityModule,
    IgxAvatarModule,
    IgxFilterModule,
    IgxListModule,
    IgxNavbarModule,
    IgxInputGroupModule,
    IgxButtonGroupModule,
    // IgxPreventDocumentScrollModule,
    IgxAvatarModule,
    IgxGridModule,
    IgxInputGroupModule,
    IgxProgressBarModule,
    IgxRippleModule,
    IgxSwitchModule,
    IgxSparklineCoreModule,
    IgxSparklineModule,
    IgxCardModule,
    IgxRippleModule,
    IgxDateRangePickerModule,
    IgxCategoryChartModule,
    IgxPieChartModule,
    SharedUIModule,
    PipesModule,
    IgxToastModule,
    IgxSliderModule,
    IgxActionStripModule,
    IgxToggleModule,
    IgxCheckboxModule
  ],
  declarations: [
    ReactiveFormsSampleComponent,
    MapBindingDataJsonPointsComponent,
    MapCasesComponent,
    SplashscreenComponent,
    ListCasesComponent,
    TimelineChartComponent,
    MarketsDashboardComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    ListSample4Component,
    BostonMarathonComponent,
    WorldIndicesGridComponent,
    FinancialChartOverviewComponent,
    AssetsGridComponent,
    AlertsGridComponent,
    ExpansionPanelCombinedChartsComponent,
    MapTypeScatterBubbleSeriesComponent,
    GridQuotesComponent,
    RSSFeedGridComponent,
    InsiderTradesGridComponent,
    PipeWithoutTownFrom,
    GridEconomicCalenderComponent,
    GridUsFedCalenderComponent,
    GridFutureStatsCalenderComponent,
    GridPortfoliosComponent,
    GridPortfoliosAssestsComponent,
    GridIndexAssetsComponent,
    GridMortgageRateComponent,
    GridUsersAssetsComponent,
    EarningsGridComponent,
    EarningsDetailsGridComponent,
    FundamentalsGridComponent,
    YTDGridComponent,
    ETFGridComponent,
    BondGridComponent,
    StockTickersGridComponent,
    YtdCodesGridComponent,
    ETFTickersGridComponent,
    OptionGridComponent,
    BondTickersGridComponent,
    MutualFundsGridComponent,
    PortfolioCreateGridComponent,
    PortfolioBulkCreateGridComponent,
    PasteHandlerDirective,
    IndexComponentsCategoryChartComponent,
    FinJSDemoComponent,
    ControllerComponent,
    GridFinJSComponent,
    MutualFundGridComponent
  ],
  exports: [
    ReactiveFormsSampleComponent,
    MapBindingDataJsonPointsComponent,
    MapCasesComponent,
    ListCasesComponent,
    TimelineChartComponent,
    MainComponent,
    MarketsDashboardComponent,
    ListSample4Component,
    BostonMarathonComponent,
    WorldIndicesGridComponent,
    FinancialChartOverviewComponent,
    AssetsGridComponent,
    AlertsGridComponent,
    ExpansionPanelCombinedChartsComponent,
    MapTypeScatterBubbleSeriesComponent,
    GridQuotesComponent,
    RSSFeedGridComponent,
    InsiderTradesGridComponent,
    GridEconomicCalenderComponent,
    GridUsFedCalenderComponent,
    GridFutureStatsCalenderComponent,
    GridPortfoliosComponent,
    GridPortfoliosAssestsComponent,
    GridIndexAssetsComponent,
    GridMortgageRateComponent,
    GridUsersAssetsComponent,
    EarningsGridComponent,
    EarningsDetailsGridComponent,
    FundamentalsGridComponent,
    YTDGridComponent,
    ETFGridComponent,
    BondGridComponent,
    StockTickersGridComponent,
    YtdCodesGridComponent,
    OptionGridComponent,
    ETFTickersGridComponent,
    BondTickersGridComponent,
    MutualFundsGridComponent,
    PortfolioCreateGridComponent,
    PortfolioBulkCreateGridComponent,
    IndexComponentsCategoryChartComponent,
    FinJSDemoComponent,
    ControllerComponent,
    GridFinJSComponent,
    MutualFundGridComponent
  ],
  providers: [
    FinancialDataService,
    IgxExcelExporterService,
    DashboardService,
    DashboardResolver,
    FinancialDataService,
    IgxExcelExporterService,
    IgxCsvExporterService,
    SignalRService,
    AnalyticsService
  ]
})
export class IgxDemoModule { }
