import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, Injectable, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConnectedPositioningStrategy, HorizontalAlignment, IgxDropDownComponent, IgxGridComponent, IgxInputGroupComponent, IgxNumberSummaryOperand, IgxSnackbarComponent, IgxSummaryResult, ISelectionEventArgs, NoOpScrollStrategy, VerticalAlignment } from 'igniteui-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})


export class AppComponent {
    @ViewChild("grid1", { static: true }) public grid1: IgxGridComponent;
    @ViewChild("grid2", { static: true }) public grid2: IgxGridComponent;
    @ViewChild(IgxDropDownComponent, { static: true }) public igxDropDown: IgxDropDownComponent;
    @ViewChild("inputGroup", { read: IgxInputGroupComponent, static: true }) public inputGroup: IgxInputGroupComponent;
    data: any[] = [];
    type: string = "Commodities";
    selectedRows: any[] = [];
    carCelectedRows: any[] = [];
    bikeSelectedRows: any[] = [];
    aeroplaneSelectedRows: any[] = [];
    selectedItemsNewGrid: any[] = [];
    isLoad = false;
    portfolioForm: FormGroup;
    public items: { field: string }[] = [
        { field: "Commodities" },
        { field: "Index" },
        { field: "Currency" },
        { field: "Rates" },
        { field: "Crypto" }

    ];
    // items: Array<{ text: string }> = [
    //     { text: "Commodities" },
    //     { text: "Index" },
    //     { text: "Currency" },
    //     { text: "Rates" },
    //     { text: "Crypto" }
    // ];
    public overlaySettings = {
        positionStrategy: new ConnectedPositioningStrategy({
            horizontalDirection: HorizontalAlignment.Left,
            horizontalStartPoint: HorizontalAlignment.Right,
            verticalStartPoint: VerticalAlignment.Bottom
        }),
        scrollStrategy: new NoOpScrollStrategy()
    };
    public mySummary = MySummary;
    dataCommoditiesGrid = [{ "SravzId": "fut_audusdfut", "chg": 0, "Chg_Pct": "0.00", "Commodity": "aud/usd fut", "High": "0.00", "Last": "0.758", "Low": "0.00", "Month": "Sep 22", "Time": "2020-12-17T16:00:00", "Country": "US", "id": "5b7fea8e55063157c1e77c94", "Name": "aust. dollar (sep'22)", "Chg": "0.00", "Open": "0.00", "Exchange": "CME:International Monetary Market", "Symbol": "ADU2", "CNBCSymbol": "@AD.1", "Volume": "0", "OpenInterest": "130812", "SettlePrice": "0.7188", "SettleDate": "2020-12-16", "pricecapturetime": "2020-12-17T15:30:50.616Z", "Open Interest": "0", "Settle": "0.758" },
    { "SravzId": "fut_brent", "chg": 0, "Chg_Pct": "0.82", "Commodity": "brent", "High": "51.90", "Last": "51.50", "Low": "51.08", "Month": "Feb 21", "Time": "2020-12-17T16:20:04.000+0100", "Country": "GB", "id": "5b7fea8e55063157c1e77c17", "Name": "ice brent crude (feb'21)", "Chg": "0.42", "Open": "51.12", "Exchange": "Intercontinental Exchange Europe", "Symbol": "LCOG1", "CNBCSymbol": "@LCO.1", "Volume": "135078", "OpenInterest": "425796", "SettlePrice": "61.44", "SettleDate": "2020-12-16", "pricecapturetime": "2020-12-17T15:30:50.555Z", "Open Interest": "320894", "Settle": "51.08" },
    { "SravzId": "fut_cocoa", "chg": 0, "Chg_Pct": "0.56", "Commodity": "cocoa", "High": "2537.00", "Last": "2531.00", "Low": "2511.00", "Month": "Mar 21", "Time": "2020-12-17T10:20:01.000-0500", "Country": "US", "id": "5b7fea8e55063157c1e77c58", "Name": "cocoa (mar'21)", "Chg": "14.00", "Open": "2537.00", "Exchange": "Intercontinental Exchange US", "Symbol": "CCH1", "CNBCSymbol": "@CC.1", "Volume": "5686", "OpenInterest": "93743", "SettlePrice": "2351.0", "SettleDate": "2020-12-16", "pricecapturetime": "2020-12-17T15:30:50.589Z", "Open Interest": "99942", "Settle": "2517.0" },
    { "SravzId": "fut_coffee", "chg": 0, "Chg_Pct": "-0.32", "Commodity": "coffee", "High": "128.00", "Last": "126.20", "Low": "126.00", "Month": "Mar 21", "Time": "2020-12-17T10:20:04.000-0500", "Country": "US", "id": "5b7fea8e55063157c1e77c54", "Name": "coffee (mar'21)", "Chg": "-0.40", "Open": "127.25", "Exchange": "Intercontinental Exchange US", "Symbol": "KCH1", "CNBCSymbol": "@KC.1", "Volume": "6798", "OpenInterest": "125823", "SettlePrice": "105.3", "SettleDate": "2020-12-16", "pricecapturetime": "2020-12-17T15:30:50.588Z", "Open Interest": "112853", "Settle": "126.6" }, { "SravzId": "fut_copper", "chg": 0, "Chg_Pct": "0.98", "Commodity": "copper", "High": "3.6135", "Last": "3.594", "Low": "3.5615", "Month": "Mar 21", "Time": "2020-12-17T10:20:34.000-0500", "Country": "US", "id": "5b7fea8e55063157c1e77c00", "Name": "copper (mar'21)", "Chg": "0.035", "Open": "3.5645", "Exchange": "CEC:Commodities Exchange Centre", "Symbol": "HGH1", "CNBCSymbol": "@HG.1", "Volume": "34629", "OpenInterest": "137935", "SettlePrice": "2.657", "SettleDate": "2020-12-16", "pricecapturetime": "2020-12-17T15:30:50.539Z", "Open Interest": "162341", "Settle": "3.559" }, { "SravzId": "fut_corn", "chg": 0, "Chg_Pct": "0.53", "Commodity": "corn", "High": "429.50", "Last": "429.50", "Low": "424.25", "Month": "Mar 21", "Time": "2020-12-17T10:20:01.000-0500", "Country": "US", "id": "5b7fea8e55063157c1e77c38", "Name": "corn (mar'21)", "Chg": "2.25", "Open": "426.25", "Exchange": "Chicago Board of Trade", "Symbol": "1CH1", "CNBCSymbol": "@C.1", "Volume": "39683", "OpenInterest": "743811", "SettlePrice": "382.0", "SettleDate": "2020-12-16", "pricecapturetime": "2020-12-17T15:30:50.573Z", "Open Interest": "852176", "Settle": "427.25" }, { "SravzId": "fut_cotton", "chg": 0, "Chg_Pct": "1.36", "Commodity": "cotton", "High": "76.81", "Last": "76.68", "Low": "75.51", "Month": "Mar 21", "Time": "2020-12-17T10:20:00.000-0500", "Country": "US", "id": "5b7fea8e55063157c1e77c6c", "Name": "cotton (mar'21)", "Chg": "1.03", "Open": "75.65", "Exchange": "Intercontinental Exchange US", "Symbol": "CTH1", "CNBCSymbol": "@CT.1", "Volume": "6944", "OpenInterest": "127579", "SettlePrice": "73.13", "SettleDate": "2020-12-16", "pricecapturetime": "2020-12-17T15:30:50.597Z", "Open Interest": "130647", "Settle": "75.65" }, { "SravzId": "fut_dowfut", "chg": 0, "Chg_Pct": "0.40", "Commodity": "dow fut", "High": "30248.00", "Last": "30193.00", "Low": "30062.00", "Month": "Mar 21", "Time": "2020-12-17T10:20:10.000-0500", "Country": "US", "id": "5b7fea8e55063157c1e77ca0", "Name": "dow jones fut (mar'21)", "Chg": "119.00", "Open": "30087.00", "Exchange": "Chicago Board of Trade", "Symbol": "1YMH1", "CNBCSymbol": "@DJ.1", "Volume": "55780", "OpenInterest": "75057", "SettlePrice": "23830.0", "SettleDate": "2020-12-16", "pricecapturetime": "2020-12-17T15:30:50.620Z", "Open Interest": "76215", "Settle": "30074.0" }, { "SravzId": "fut_ethanol", "chg": 0, "Chg_Pct": "0.00", "Commodity": "ethanol", "High": "0.00", "Last": "1.31", "Low": "0.00", "Month": "Jan 21", "Time": "2020-12-03", "Country": "US", "id": "5b7fea8e55063157c1e77c29", "Name": "ethanol (jan'21)", "Chg": "0.00", "Open": "0.00", "Exchange": "Chicago Board of Trade", "Symbol": "1ZEF1", "CNBCSymbol": "@AC.1", "Volume": "0", "OpenInterest": "1827", "SettlePrice": "1.281", "SettleDate": "2020-12-16", "pricecapturetime": "2020-12-17T15:30:50.569Z", "Open Interest": "32", "Settle": "1.31" }, { "SravzId": "fut_eurusdfut", "chg": 0, "Chg_Pct": "0.73", "Commodity": "eur/usd fut", "High": "1.2277", "Last": "1.2268", "Low": "1.2205", "Month": "Jan 21", "Time": "2020-12-17T10:06:06.000-0500", "Country": "US", "id": "5b7fea8e55063157c1e77cc0", "Name": "euro future (jan'21)", "Chg": "0.0089", "Open": "1.2209", "Exchange": "CME:International Monetary Market", "Symbol": "1UROF1", "CNBCSymbol": "@URO.1", "Volume": "890", "OpenInterest": "505509", "SettlePrice": "1.16095", "SettleDate": "2020-12-16", "pricecapturetime": "2020-12-17T15:30:50.632Z", "Open Interest": "2116", "Settle": "1.2179" }]

    dataIndexGrid = [{ "id": "5e34bbe755063157c1a693ec", "SravzId": "idx_unknown_000906", "Ticker": "000906.INDX", "Country": "Unknown", "Name": "CHINA SECURITIES INDEX 800", "Exchange": "INDX", "MajorIndex": false, "CapitalLatitude": 0, "CapitalLongitude": 0, "Canberra": "", "Last": 0, "Change": 0, "PercentChange": 0, "PreviousClose": 5150.5567, "PreviousChange": 0, "PercentPreviousChange": 0, "DayOpen": 0, "DayLow": 0, "DayHigh": 0, "52WeekLow": 0, "52WeekHigh": 0, "MarketCap": 0, "AvgVolume": 0, "PERatio": 0, "RevPerEmployee": 0, "EPS": 0, "Div": 0, "DivYield": 0, "ExDivDate": "0001-01-01T00:00:00Z", "Time": "2020-12-17T10:16:20.849-05:00" }, { "id": "5e34bbe755063157c1a693f1", "SravzId": "idx_us_acwi", "Ticker": "ACWI.INDX", "Country": "USA", "Name": "MSCI International ACWI Net Index US", "Exchange": "INDX", "MajorIndex": false, "CapitalLatitude": 38.883333, "CapitalLongitude": -77, "Canberra": "", "Last": 323.34, "Change": 0, "PercentChange": 0, "PreviousClose": 323.34, "PreviousChange": 0, "PercentPreviousChange": 0, "DayOpen": 0, "DayLow": 0, "DayHigh": 0, "52WeekLow": 0, "52WeekHigh": 0, "MarketCap": 0, "AvgVolume": 0, "PERatio": 0, "RevPerEmployee": 0, "EPS": 0, "Div": 0, "DivYield": 0, "ExDivDate": "0001-01-01T00:00:00Z", "Time": "2020-12-17T10:16:20.876-05:00" }, { "id": "5e34bbe755063157c1a693f8", "SravzId": "idx_nl_aex", "Ticker": "AEX.INDX", "Country": "Netherlands", "Name": "AEX Amsterdam Index", "Exchange": "INDX", "MajorIndex": false, "CapitalLatitude": 52.35, "CapitalLongitude": 4.916667, "Canberra": "", "Last": 625.76, "Change": 3.9, "PercentChange": 0.627, "PreviousClose": 621.86, "PreviousChange": 0, "PercentPreviousChange": 0, "DayOpen": 0, "DayLow": 0, "DayHigh": 0, "52WeekLow": 0, "52WeekHigh": 0, "MarketCap": 0, "AvgVolume": 0, "PERatio": 0, "RevPerEmployee": 0, "EPS": 0, "Div": 0, "DivYield": 0, "ExDivDate": "0001-01-01T00:00:00Z", "Time": "2020-12-17T10:16:20.879-05:00" }, { "id": "5e34bbe755063157c1a693ff", "SravzId": "idx_au_aord", "Ticker": "AORD.INDX", "Country": "Australia", "Name": "Australia All Ordinaries", "Exchange": "INDX", "MajorIndex": true, "CapitalLatitude": -35.266666666666666, "CapitalLongitude": 149.133333, "Canberra": "", "Last": 7000.1001, "Change": 83.4, "PercentChange": 1.206, "PreviousClose": 6916.7, "PreviousChange": 0, "PercentPreviousChange": 0, "DayOpen": 0, "DayLow": 0, "DayHigh": 0, "52WeekLow": 0, "52WeekHigh": 0, "MarketCap": 0, "AvgVolume": 0, "PERatio": 0, "RevPerEmployee": 0, "EPS": 0, "Div": 0, "DivYield": 0, "ExDivDate": "0001-01-01T00:00:00Z", "Time": "2020-12-17T10:16:20.889-05:00" }, { "id": "5e34bbe755063157c1a69401", "SravzId": "idx_au_atli", "Ticker": "ATLI.INDX", "Country": "Australia", "Name": "ATLI", "Exchange": "INDX", "MajorIndex": false, "CapitalLatitude": -35.266666666666666, "CapitalLongitude": 149.133333, "Canberra": "", "Last": 3700.3999, "Change": 42.1, "PercentChange": 1.151, "PreviousClose": 3658.3, "PreviousChange": 0, "PercentPreviousChange": 0, "DayOpen": 0, "DayLow": 0, "DayHigh": 0, "52WeekLow": 0, "52WeekHigh": 0, "MarketCap": 0, "AvgVolume": 0, "PERatio": 0, "RevPerEmployee": 0, "EPS": 0, "Div": 0, "DivYield": 0, "ExDivDate": "0001-01-01T00:00:00Z", "Time": "2020-12-17T10:16:20.898-05:00" }, { "id": "5e34bbe755063157c1a693fd", "SravzId": "idx_nl_amx", "Ticker": "AMX.INDX", "Country": "Netherlands", "Name": "AMX", "Exchange": "INDX", "MajorIndex": false, "CapitalLatitude": 52.35, "CapitalLongitude": 4.916667, "Canberra": "", "Last": 927.3, "Change": 7.3, "PercentChange": 0.793, "PreviousClose": 920, "PreviousChange": 0, "PercentPreviousChange": 0, "DayOpen": 0, "DayLow": 0, "DayHigh": 0, "52WeekLow": 0, "52WeekHigh": 0, "MarketCap": 0, "AvgVolume": 0, "PERatio": 0, "RevPerEmployee": 0, "EPS": 0, "Div": 0, "DivYield": 0, "ExDivDate": "0001-01-01T00:00:00Z", "Time": "2020-12-17T10:16:20.885-05:00" }, { "id": "5e34bbe755063157c1a693fa", "SravzId": "idx_au_afli", "Ticker": "AFLI.INDX", "Country": "Australia", "Name": "AFLI", "Exchange": "INDX", "MajorIndex": false, "CapitalLatitude": -35.266666666666666, "CapitalLongitude": 149.133333, "Canberra": "", "Last": 6490.3999, "Change": 65.6, "PercentChange": 1.021, "PreviousClose": 6424.7998, "PreviousChange": 0, "PercentPreviousChange": 0, "DayOpen": 0, "DayLow": 0, "DayHigh": 0, "52WeekLow": 0, "52WeekHigh": 0, "MarketCap": 0, "AvgVolume": 0, "PERatio": 0, "RevPerEmployee": 0, "EPS": 0, "Div": 0, "DivYield": 0, "ExDivDate": "0001-01-01T00:00:00Z", "Time": "2020-12-17T10:16:20.882-05:00" }, { "id": "5e34bbe755063157c1a69405", "SravzId": "idx_at_atx", "Ticker": "ATX.INDX", "Country": "Austria", "Name": "Austrian Traded Index in EUR", "Exchange": "INDX", "MajorIndex": false, "CapitalLatitude": 48.2, "CapitalLongitude": 16.366667, "Canberra": "", "Last": 2724.8, "Change": 3.13, "PercentChange": 0.115, "PreviousClose": 2721.67, "PreviousChange": 0, "PercentPreviousChange": 0, "DayOpen": 0, "DayLow": 0, "DayHigh": 0, "52WeekLow": 0, "52WeekHigh": 0, "MarketCap": 0, "AvgVolume": 0, "PERatio": 0, "RevPerEmployee": 0, "EPS": 0, "Div": 0, "DivYield": 0, "ExDivDate": "0001-01-01T00:00:00Z", "Time": "2020-12-17T10:16:22.352-05:00" }, { "id": "5e34bbe755063157c1a69407", "SravzId": "idx_au_axdj", "Ticker": "AXDJ.INDX", "Country": "Australia", "Name": "AXDJ", "Exchange": "INDX", "MajorIndex": false, "CapitalLatitude": -35.266666666666666, "CapitalLongitude": 149.133333, "Canberra": "", "Last": 2949.7, "Change": 21, "PercentChange": 0.717, "PreviousClose": 2928.7, "PreviousChange": 0, "PercentPreviousChange": 0, "DayOpen": 0, "DayLow": 0, "DayHigh": 0, "52WeekLow": 0, "52WeekHigh": 0, "MarketCap": 0, "AvgVolume": 0, "PERatio": 0, "RevPerEmployee": 0, "EPS": 0, "Div": 0, "DivYield": 0, "ExDivDate": "0001-01-01T00:00:00Z", "Time": "2020-12-17T10:16:20.905-05:00" }, { "id": "5e34bbe755063157c1a6940b", "SravzId": "idx_au_axej", "Ticker": "AXEJ.INDX", "Country": "Australia", "Name": "AXEJ", "Exchange": "INDX", "MajorIndex": false, "CapitalLatitude": -35.266666666666666, "CapitalLongitude": 149.133333, "Canberra": "", "Last": 8333.2998, "Change": 163.3, "PercentChange": 1.999, "PreviousClose": 8170, "PreviousChange": 0, "PercentPreviousChange": 0, "DayOpen": 0, "DayLow": 0, "DayHigh": 0, "52WeekLow": 0, "52WeekHigh": 0, "MarketCap": 0, "AvgVolume": 0, "PERatio": 0, "RevPerEmployee": 0, "EPS": 0, "Div": 0, "DivYield": 0, "ExDivDate": "0001-01-01T00:00:00Z", "Time": "2020-12-17T10:16:20.909-05:00" }, { "id": "5e34bbe755063157c1a6940d", "SravzId": "idx_au_axfj", "Ticker": "AXFJ.INDX", "Country": "Australia", "Name": "AXFJ", "Exchange": "INDX", "MajorIndex": false, "CapitalLatitude": -35.266666666666666, "CapitalLongitude": 149.133333, "Canberra": "", "Last": 5651.8999, "Change": 60.3, "PercentChange": 1.078, "PreviousClose": 5591.6, "PreviousChange": 0, "PercentPreviousChange": 0, "DayOpen": 0, "DayLow": 0, "DayHigh": 0, "52WeekLow": 0, "52WeekHigh": 0, "MarketCap": 0, "AvgVolume": 0, "PERatio": 0, "RevPerEmployee": 0, "EPS": 0, "Div": 0, "DivYield": 0, "ExDivDate": "0001-01-01T00:00:00Z", "Time": "2020-12-17T10:16:20.912-05:00" }]
    dataCurrencyGrid = [{ "id": "5d9799b455063157c1d2b6c9", "SravzId": "forex_usd_inr", "Ticker": "USDINR=X", "Name": "USD/INR", "Last": 73.58, "Change": 0, "PercentChange": "", "Time": "2020-12-17T10:05:36.156-05:00" }, { "id": "5d9799b455063157c1d2b6cb", "SravzId": "forex_usd_jpy", "Ticker": "USDJPY=X", "Name": "USD/JPY", "Last": 102.906, "Change": 0, "PercentChange": "", "Time": "2020-12-17T10:05:36.176-05:00" }, { "id": "5d9799b455063157c1d2b6cf", "SravzId": "forex_gbp_usd", "Ticker": "GBPUSD=X", "Name": "GBP/USD", "Last": 1.3592, "Change": 0, "PercentChange": "", "Time": "2020-12-17T10:05:36.186-05:00" }, { "id": "5d9799b455063157c1d2b6d7", "SravzId": "forex_usd_cad", "Ticker": "USDCAD=X", "Name": "USD/CAD", "Last": 1.2693, "Change": 0, "PercentChange": "", "Time": "2020-12-17T10:05:36.189-05:00" }, { "id": "5d9799b455063157c1d2b6d5", "SravzId": "forex_usd_chf", "Ticker": "USDCHF=X", "Name": "USD/CHF", "Last": 0.8837, "Change": 0, "PercentChange": "", "Time": "2020-12-17T10:05:36.188-05:00" }, { "id": "5d9799b455063157c1d2b6d3", "SravzId": "forex_eur_usd", "Ticker": "EURUSD=X", "Name": "EUR/USD", "Last": 1.2255, "Change": 0, "PercentChange": "", "Time": "2020-12-17T10:05:36.187-05:00" }, { "id": "5d9799b455063157c1d2b6df", "SravzId": "forex_jpy_inr", "Ticker": "JPYINR=X", "Name": "JPY/INR", "Last": 0.7135, "Change": 0, "PercentChange": "", "Time": "2020-12-17T10:05:36.193-05:00" }, { "id": "5d9799b455063157c1d2b6db", "SravzId": "forex_aud_usd", "Ticker": "AUDUSD=X", "Name": "AUD/USD", "Last": 0.7629, "Change": 0, "PercentChange": "", "Time": "2020-12-17T10:05:36.191-05:00" }, { "id": "5d9799b455063157c1d2b6dd", "SravzId": "forex_usd_cny", "Ticker": "USDCNY=X", "Name": "USD/CNY", "Last": 6.5345, "Change": 0, "PercentChange": "", "Time": "2020-12-17T10:05:36.192-05:00" }, { "id": "5d9799b455063157c1d2b6e5", "SravzId": "forex_gbp_inr", "Ticker": "GBPINR=X", "Name": "GBP/INR", "Last": 99.9698, "Change": 0, "PercentChange": "", "Time": "2020-12-17T10:05:36.195-05:00" }, { "id": "5d9799b455063157c1d2b6e3", "SravzId": "forex_eur_inr", "Ticker": "EURINR=X", "Name": "EUR/INR", "Last": 89.9894, "Change": 0, "PercentChange": "", "Time": "2020-12-17T10:05:36.194-05:00" }, { "id": "5d9799b455063157c1d2b6e7", "SravzId": "forex_cny_inr", "Ticker": "CNYINR=X", "Name": "CNY/INR", "Last": 11.262, "Change": 0, "PercentChange": "", "Time": "2020-12-17T10:05:36.196-05:00" }, { "id": "5d9799b455063157c1d2b6eb", "SravzId": "forex_dxy_inr", "Ticker": "DXYINR=X", "Name": "DXY/INR", "Last": 81.963, "Change": 0, "PercentChange": "", "Time": "2020-12-17T10:05:36.197-05:00" }]

    dataRatesGrid = [{ "id": "5cf1b12d55063157c18b92c7", "SravzId": "int_usa_usd", "Ticker": "", "Name": " American interest rate FED", "Last": 0.25, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.247-05:00" }, { "id": "5cf1b12e55063157c18b92d1", "SravzId": "int_aus_aud", "Ticker": "", "Name": " Australian interest rate RBA", "Last": 0.1, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.27-05:00" }, { "id": "5cf1b12e55063157c18b92d6", "SravzId": "int_chl_clp", "Ticker": "", "Name": " Banco Central interest rate", "Last": 0.5, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.272-05:00" }, { "id": "5cf1b12e55063157c18b92d8", "SravzId": "int_bra_brl", "Ticker": "", "Name": " Brazilian interest rate BACEN", "Last": 2, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.273-05:00" }, { "id": "5cf1b12e55063157c18b92e2", "SravzId": "int_gbr_gbp", "Ticker": "", "Name": " British interest rate BoE", "Last": 0.1, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.275-05:00" }, { "id": "5cf1b12e55063157c18b92e6", "SravzId": "int_can_cad", "Ticker": "", "Name": " Canadian interest rate BOC", "Last": 0.25, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.276-05:00" }, { "id": "5cf1b12e55063157c18b92ea", "SravzId": "int_chn_cny", "Ticker": "", "Name": " Chinese interest rate PBC", "Last": 3.85, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.287-05:00" }, { "id": "5cf1b12e55063157c18b92f0", "SravzId": "int_dnk_dkk", "Ticker": "", "Name": " Danish interest rate Nationalbanken", "Last": 0.05, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.291-05:00" }, { "id": "5cf1b12e55063157c18b92f5", "SravzId": "int_ecb_eur", "Ticker": "", "Name": " European interest rate ECB", "Last": 0, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.294-05:00" }, { "id": "5cf1b12e55063157c18b92fa", "SravzId": "int_ind_inr", "Ticker": "", "Name": " Indian interest rate RBI", "Last": 4, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.304-05:00" }, { "id": "5cf1b12e55063157c18b92f8", "SravzId": "int_hun_huf", "Ticker": "", "Name": " Hungarian interest rate", "Last": 0.6, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.302-05:00" }, { "id": "5cf1b12e55063157c18b9300", "SravzId": "int_idn_idr", "Ticker": "", "Name": " Indonesian interest rate BI", "Last": 6.5, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.306-05:00" }, { "id": "5cf1b12f55063157c18b9304", "SravzId": "int_isr_ils", "Ticker": "", "Name": " Israeli interest rate BOI", "Last": 0.1, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.308-05:00" }, { "id": "5cf1b12f55063157c18b9306", "SravzId": "int_jpn_jpy", "Ticker": "", "Name": " Japanese interest rate BoJ", "Last": -0.1, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.311-05:00" }, { "id": "5cf1b12f55063157c18b9317", "SravzId": "int_sau_sar", "Ticker": "", "Name": " Saudi Ariabian interest rate", "Last": 1, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.319-05:00" }, { "id": "5cf1b12f55063157c18b9311", "SravzId": "int_nor_nok", "Ticker": "", "Name": " Norwegian interest rate", "Last": 0, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.315-05:00" }, { "id": "5cf1b12f55063157c18b930a", "SravzId": "int_mex_mxn", "Ticker": "", "Name": " Mexican interest rate Banxico", "Last": 4.25, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.313-05:00" }, { "id": "5cf1b12f55063157c18b931b", "SravzId": "int_swe_sek", "Ticker": "", "Name": " Swedish interest rate Riksbank", "Last": 0, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.321-05:00" }, { "id": "5cf1b12f55063157c18b930d", "SravzId": "int_nzl_nzd", "Ticker": "", "Name": " New Zealand interest rate", "Last": 0.25, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.314-05:00" }, { "id": "5cf1b12f55063157c18b9314", "SravzId": "int_pol_pln", "Ticker": "", "Name": " Polish interest rate", "Last": 0.1, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.316-05:00" }, { "id": "5cf1b12f55063157c18b9319", "SravzId": "int_zaf_zar", "Ticker": "", "Name": " South African interest rate SARB", "Last": 3.5, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.32-05:00" }, { "id": "5cf1b12f55063157c18b9320", "SravzId": "int_che_chf", "Ticker": "", "Name": " Swiss interest rate SNB", "Last": -0.75, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.322-05:00" }, { "id": "5cf1b12f55063157c18b9324", "SravzId": "int_tur_try", "Ticker": "", "Name": " Turkish interest rate CBRT", "Last": 15, "Change": 0, "PercentChange": "", "Time": "2020-12-16T21:00:44.324-05:00" }]
    dataCryptoGrid = [{ "id": "5cf4458255063157c1979bf7", "SravzId": "crypto_btc_usd", "Ticker": "BTC-USD.CC", "Name": "Bitcoin", "Last": 17387.0234, "Change": 254.917, "PercentChange": "", "Time": "2020-11-26T20:43:27.205-05:00" }, { "id": "5cf4458255063157c1979c09", "SravzId": "crypto_eth_usd", "Ticker": "ETH-USD.CC", "Name": "Ethereum", "Last": 527.9831, "Change": 7.383, "PercentChange": "", "Time": "2020-11-26T20:43:27.253-05:00" }, { "id": "5cf4458355063157c1979c22", "SravzId": "crypto_bnb_usd", "Ticker": "BNB-USD.CC", "Name": "Binance Coin", "Last": 28.5366, "Change": 0.301, "PercentChange": "", "Time": "2020-11-26T20:43:27.202-05:00" }, { "id": "5cf4458355063157c1979c27", "SravzId": "crypto_bsv_usd", "Ticker": "BSV-USD.CC", "Name": "Bitcoin SV", "Last": 167.9992, "Change": 3.155, "PercentChange": "", "Time": "2020-11-26T20:43:28.043-05:00" }, { "id": "5cf4458255063157c1979c12", "SravzId": "crypto_xrp_usd", "Ticker": "XRP-USD.CC", "Name": "XRP", "Last": 0.5589, "Change": 0.026, "PercentChange": "", "Time": "2020-11-26T20:43:27.489-05:00" }, { "id": "5cf4458355063157c1979c1c", "SravzId": "crypto_eos_usd", "Ticker": "EOS-USD.CC", "Name": "EOS", "Last": 2.9911, "Change": 0.073, "PercentChange": "", "Time": "2020-11-26T20:43:27.25-05:00" }, { "id": "5cf4458355063157c1979c20", "SravzId": "crypto_ltc_usd", "Ticker": "LTC-USD.CC", "Name": "Litecoin", "Last": 72.1884, "Change": 1.829, "PercentChange": "", "Time": "2020-11-26T20:43:27.317-05:00" }, { "id": "5cf4458355063157c1979c2e", "SravzId": "crypto_xlm_usd", "Ticker": "XLM-USD.CC", "Name": "Stellar", "Last": 0.178, "Change": 0.013, "PercentChange": "", "Time": "2020-11-26T20:43:27.487-05:00" }, { "id": "5cf4458355063157c1979c18", "SravzId": "crypto_bch_usd", "Ticker": "BCH-USD.CC", "Name": "Bitcoin Cash", "Last": 275.3623, "Change": 5.961, "PercentChange": "", "Time": "2020-11-26T20:43:27.192-05:00" }, { "id": "5cf4458355063157c1979c32", "SravzId": "crypto_trx_usd", "Ticker": "TRX-USD.CC", "Name": "TRON", "Last": 0.0298, "Change": 0.001, "PercentChange": "", "Time": "2020-11-26T20:43:27.449-05:00" }, { "id": "5e3564d655063157c1a89698", "SravzId": "crypto_ada_usd", "Ticker": "ADA-USD.CC", "Name": "Cardano", "Last": 0.1405, "Change": 0.003, "PercentChange": "", "Time": "2020-11-26T20:43:26.901-05:00" }, { "id": "5e3564d655063157c1a8969b", "SravzId": "crypto_adx_usd", "Ticker": "ADX-USD.CC", "Name": "AdEx", "Last": 0.2726, "Change": 0.004, "PercentChange": "", "Time": "2020-11-26T20:43:27.115-05:00" }, { "id": "5e3564d655063157c1a896a3", "SravzId": "crypto_ardr_usd", "Ticker": "ARDR-USD.CC", "Name": "Ardor", "Last": 0.0665, "Change": 0.003, "PercentChange": "", "Time": "2020-11-26T20:43:27.183-05:00" }, { "id": "5e3564d655063157c1a8969e", "SravzId": "crypto_ae_usd", "Ticker": "AE-USD.CC", "Name": "Aeternity", "Last": 0.1246, "Change": 0.005, "PercentChange": "", "Time": "2020-11-26T20:43:27.118-05:00" }, { "id": "5e3564d655063157c1a896a0", "SravzId": "crypto_ant_usd", "Ticker": "ANT-USD.CC", "Name": "Aragon", "Last": 3.2813, "Change": 0.031, "PercentChange": "", "Time": "2020-11-26T20:43:27.179-05:00" }, { "id": "5e3564d655063157c1a896a5", "SravzId": "crypto_ark_usd", "Ticker": "ARK-USD.CC", "Name": "Ark", "Last": 0.373, "Change": 0.009, "PercentChange": "", "Time": "2020-11-26T20:43:27.186-05:00" }, { "id": "5e3564d655063157c1a896ab", "SravzId": "crypto_bat_usd", "Ticker": "BAT-USD.CC", "Name": "Basic Attention Token", "Last": 0.2262, "Change": 0.003, "PercentChange": "", "Time": "2020-11-26T20:43:27.189-05:00" }, { "id": "5e3564d655063157c1a896a9", "SravzId": "crypto_atb_usd", "Ticker": "ATB-USD.CC", "Name": "ATBCoin", "Last": 0.0009, "Change": 0, "PercentChange": "", "Time": "2020-11-26T20:43:27.188-05:00" }, { "id": "5e3564d655063157c1a896b2", "SravzId": "crypto_block_usd", "Ticker": "BLOCK-USD.CC", "Name": "Blocknet", "Last": 1.2154, "Change": 0.353, "PercentChange": "", "Time": "2020-11-26T20:43:27.199-05:00" }, { "id": "5e3564d655063157c1a896b0", "SravzId": "crypto_bcn_usd", "Ticker": "BCN-USD.CC", "Name": "Bytecoin", "Last": 0.0001, "Change": 0, "PercentChange": "", "Time": "2020-11-26T20:43:27.194-05:00" }, { "id": "5e3564d655063157c1a896b7", "SravzId": "crypto_bnt_usd", "Ticker": "BNT-USD.CC", "Name": "Bancor", "Last": 0.9646, "Change": -0.003, "PercentChange": "", "Time": "2020-11-26T20:43:27.203-05:00" }, { "id": "5e3564d655063157c1a896c3", "SravzId": "crypto_bts_usd", "Ticker": "BTS-USD.CC", "Name": "BitShares", "Last": 0.0228, "Change": 0.001, "PercentChange": "", "Time": "2020-11-26T20:43:27.211-05:00" }, { "id": "5e3564d655063157c1a896c0", "SravzId": "crypto_btm_usd", "Ticker": "BTM-USD.CC", "Name": "BTM", "Last": 0.0665, "Change": 0.001, "PercentChange": "", "Time": "2020-11-26T20:43:27.21-05:00" }, { "id": "5e3564d655063157c1a896bd", "SravzId": "crypto_btg_usd", "Ticker": "BTG-USD.CC", "Name": "Bitgem", "Last": 8.6256, "Change": 8.343, "PercentChange": "", "Time": "2020-11-26T20:43:27.208-05:00" }, { "id": "5e3564d755063157c1a896ce", "SravzId": "crypto_dgb_usd", "Ticker": "DGB-USD.CC", "Name": "DigiByte", "Last": 0.0233, "Change": 0, "PercentChange": "", "Time": "2020-11-26T20:43:27.233-05:00" }, { "id": "5e3564d755063157c1a896c8", "SravzId": "crypto_dash_usd", "Ticker": "DASH-USD.CC", "Name": "Dash", "Last": 92.4227, "Change": 1.092, "PercentChange": "", "Time": "2020-11-26T20:43:27.225-05:00" }, { "id": "5e3564d755063157c1a896ca", "SravzId": "crypto_dcn_usd", "Ticker": "DCN-USD.CC", "Name": "DualCoin", "Last": 0, "Change": 0, "PercentChange": "NA", "Time": "2020-11-26T20:43:27.227-05:00" }, { "id": "5e3564d755063157c1a896d2", "SravzId": "crypto_dnt_usd", "Ticker": "DNT-USD.CC", "Name": "district0x", "Last": 0.0515, "Change": 0.001, "PercentChange": "", "Time": "2020-11-26T20:43:27.238-05:00" }, { "id": "5e3564d655063157c1a896c6", "SravzId": "crypto_cvc_usd", "Ticker": "CVC-USD.CC", "Name": "Civic", "Last": 0.0768, "Change": 0.001, "PercentChange": "", "Time": "2020-11-26T20:43:27.22-05:00" }, { "id": "5e3564d755063157c1a896d0", "SravzId": "crypto_dgd_usd", "Ticker": "DGD-USD.CC", "Name": "DigixDAO", "Last": 101.714, "Change": 1.835, "PercentChange": "", "Time": "2020-11-26T20:43:27.234-05:00" }, { "id": "5e3564d755063157c1a896cc", "SravzId": "crypto_dcr_usd", "Ticker": "DCR-USD.CC", "Name": "Decred", "Last": 20.9437, "Change": -0.032, "PercentChange": "", "Time": "2020-11-26T20:43:27.229-05:00" }, { "id": "5e3564d755063157c1a896dc", "SravzId": "crypto_etc_usd", "Ticker": "ETC-USD.CC", "Name": "Ethereum Classic", "Last": 6.2369, "Change": 0.089, "PercentChange": "", "Time": "2020-11-26T20:43:27.251-05:00" }, { "id": "5e3564d755063157c1a896d8", "SravzId": "crypto_edg_usd", "Ticker": "EDG-USD.CC", "Name": "Edgeless", "Last": 0.0019, "Change": 0, "PercentChange": "", "Time": "2020-11-26T20:43:27.241-05:00" }, { "id": "5e3564d755063157c1a896d6", "SravzId": "crypto_doge_usd", "Ticker": "DOGE-USD.CC", "Name": "Dogecoin", "Last": 0.0033, "Change": 0, "PercentChange": "", "Time": "2020-11-26T20:43:27.24-05:00" }, { "id": "5e3564d755063157c1a896df", "SravzId": "crypto_etp_usd", "Ticker": "ETP-USD.CC", "Name": "Metaverse ETP", "Last": 0.1251, "Change": 0, "PercentChange": "", "Time": "2020-11-26T20:43:27.254-05:00" }, { "id": "5e3564d755063157c1a896e3", "SravzId": "crypto_fct_usd", "Ticker": "FCT-USD.CC", "Name": "Factom", "Last": 1.1022, "Change": -0.011, "PercentChange": "", "Time": "2020-11-26T20:43:27.258-05:00" }, { "id": "5e3564d755063157c1a896e7", "SravzId": "crypto_frst_usd", "Ticker": "FRST-USD.CC", "Name": "FirstCoin", "Last": 0.0031, "Change": 0, "PercentChange": "", "Time": "2020-11-26T20:43:27.259-05:00" }, { "id": "5e3564d755063157c1a896f0", "SravzId": "crypto_gas_usd", "Ticker": "GAS-USD.CC", "Name": "Gas", "Last": 1.5455, "Change": -0.02, "PercentChange": "", "Time": "2020-11-26T20:43:27.279-05:00" }, { "id": "5e3564d755063157c1a896eb", "SravzId": "crypto_fun_usd", "Ticker": "FUN-USD.CC", "Name": "FunFair", "Last": 0.004, "Change": 0, "PercentChange": "", "Time": "2020-11-26T20:43:27.277-05:00" }, { "id": "5e3564d755063157c1a896f3", "SravzId": "crypto_gbyte_usd", "Ticker": "GBYTE-USD.CC", "Name": "Obyte", "Last": 22.6056, "Change": 0.374, "PercentChange": "", "Time": "2020-11-26T20:43:27.281-05:00" }, { "id": "5e3564d755063157c1a896ee", "SravzId": "crypto_game_usd", "Ticker": "GAME-USD.CC", "Name": "GameCredits", "Last": 0.0564, "Change": -0.002, "PercentChange": "", "Time": "2020-11-26T20:43:27.278-05:00" }, { "id": "5e3564d755063157c1a896f6", "SravzId": "crypto_gno_usd", "Ticker": "GNO-USD.CC", "Name": "Gnosis", "Last": 60.0356, "Change": 2.061, "PercentChange": "", "Time": "2020-11-26T20:43:27.283-05:00" }, { "id": "5e3564d755063157c1a896f8", "SravzId": "crypto_gnt_usd", "Ticker": "GNT-USD.CC", "Name": "Golem", "Last": 0.1121, "Change": -0.017, "PercentChange": "", "Time": "2020-11-26T20:43:27.284-05:00" }, { "id": "5e3564d755063157c1a896fe", "SravzId": "crypto_icx_usd", "Ticker": "ICX-USD.CC", "Name": "ICON", "Last": 0.4133, "Change": 0.009, "PercentChange": "", "Time": "2020-11-26T20:43:27.291-05:00" }, { "id": "5e3564d755063157c1a89700", "SravzId": "crypto_ioc_usd", "Ticker": "IOC-USD.CC", "Name": "I/O Coin", "Last": 0.0793, "Change": 0.001, "PercentChange": "", "Time": "2020-11-26T20:43:27.294-05:00" }, { "id": "5e3564d755063157c1a89704", "SravzId": "crypto_kin_usd", "Ticker": "KIN-USD.CC", "Name": "Kin", "Last": 0, "Change": 0, "PercentChange": "NA", "Time": "2020-11-26T20:43:27.299-05:00" }, { "id": "5e3564d755063157c1a8970a", "SravzId": "crypto_knc_usd", "Ticker": "KNC-USD.CC", "Name": "KingN Coin", "Last": 1.0008, "Change": -7.912, "PercentChange": "", "Time": "2020-11-26T20:43:27.302-05:00" }, { "id": "5e3564d755063157c1a8970c", "SravzId": "crypto_link_usd", "Ticker": "LINK-USD.CC", "Name": "Chainlink", "Last": 12.7602, "Change": 0.316, "PercentChange": "", "Time": "2020-11-26T20:43:27.309-05:00" }]
    constructor(private datePipe: DatePipe, private formBuilder: FormBuilder) {


    }
    public ngOnInit(): void {
        this.createPortfolio();
        this.data = this.dataCommoditiesGrid;
        this.selectedRows = [];
        //this.igxDropDown.selectedItem.value = this.type;

    }

    createPortfolio(portfolio?) {
        this.portfolioForm = this.formBuilder.group({
            'name': [portfolio == undefined ? null : portfolio.name, { validators: [], updateOn: 'change' }],
            'description': [portfolio == undefined ? "" : portfolio.description, { validators: [], updateOn: 'change' }],
            'cost': [portfolio == undefined ? null : portfolio.cost, { validators: [], updateOn: 'change' }],
            'value': [portfolio == undefined ? null : portfolio.value, { validators: [], updateOn: 'change' }],
            'created': [portfolio == undefined ? null : portfolio.created, { validators: [], updateOn: 'change' }],
            'ispublic': [portfolio == undefined ? false : portfolio.ispublic, { validators: [], updateOn: 'change' }],
            'pnl': [portfolio == undefined ? 0 : portfolio.pnl, { validators: [], updateOn: 'change' }],
            'portfolioassets': [[], { validators: [], updateOn: 'change' }]
        });
    }

    submitPortfolio() {
        // let value = this.grid2.summaryService.summaryCacheMap.forEach;
        let sum = 0;
        this.selectedItemsNewGrid.forEach(item => {
            sum += +item.Weight_Price;
        });
        this.portfolioForm.value.cost = sum;
        this.portfolioForm.value.value = sum;
        alert(JSON.stringify(this.portfolioForm.value));
    }

    public onDDLSelection(eventArgs: ISelectionEventArgs) {
        this.type = eventArgs.newSelection.value;
        if (this.type == "Commodities") {
            this.data = this.dataCommoditiesGrid;
        } else if (this.type == "Index") {
            this.data = this.dataIndexGrid;
        }
        else if (this.type == "Currency") {
            this.data = this.dataCurrencyGrid;
        }
        else if (this.type == "Rates") {
            this.data = this.dataRatesGrid;
        } else {
            this.data = this.dataCryptoGrid;
        }
        this.grid1.selectedRows = this.getSelectedRows(this.type);
        console.log("this.type: ", this.type);
        // eventArgs.cancel = true;
    }

    private backgroundClasses = (rowData: any, columnKey: string): boolean => {
        return rowData.Chg_Pct > 0;
    };

    private backgroundClasssesPsPercentage = (rowData: any, columnKey: string): boolean => {
        return rowData.Chg_Pct < 0;
    };
    
    backgroundCell = {
        'showUp': this.backgroundClasses,
        'showDown': this.backgroundClasssesPsPercentage
    };



    getSelectedRows(type) {
        if (this.selectedItemsNewGrid.length > 0) {
            let items = [];
            let itemIds = this.selectedItemsNewGrid.length > 0 ? this.selectedItemsNewGrid.map(({ id }) => (id)) : [];
            this.selectedItemsNewGrid.forEach(element => {
                let item = this.data.find(f => f.id == element.id);
                if (item)
                    items.push(item.id);
                // items.push(element);
            });
            return items;

        } else {
            return [];
        }
    }

    public ngAfterViewInit(): void {
    }

    public handleRowSelection(args) {
        if (args.added.length || args.removed.length) {
            let selectedList: any[] = [];
            args.removed.forEach(element => {
                let item = this.selectedItemsNewGrid.find(f => f.id == element);
                this.selectedItemsNewGrid.splice(this.selectedItemsNewGrid.indexOf(item), 1);
            });
            args.newSelection.forEach(element => {
                selectedList.push(this.data.find(f => f.id == element));
            });
            this.addOrRemoveItemsToNewGrid(selectedList, this.type);
        }
    }

    addOrRemoveItemsToNewGrid(items, type) {
        let gridRows = this.selectedItemsNewGrid;
        this.isLoad = true;
        if (gridRows.length > 0) {
            items.forEach((element, index) => {
                let item = gridRows.find(f => f.id == element.id);
                if (item) {
                    gridRows.splice(gridRows.indexOf(item), 1);
                }
            });
        }
        if (items.length > 0) {
            this.selectedItemsNewGrid = [];
            // items.forEach(element => {
            //     this.selectedItemsNewGrid.push(element);
            // });
            gridRows = gridRows.concat(items);
            gridRows.map(item => { item.Weight_Pct = 100 / gridRows.length; item.Weight_Price = (item.Last * item.Weight_Pct) / 100 });

            setTimeout(() => {
                this.selectedItemsNewGrid = gridRows;
            }, 500);
        }
    }

    public openDropDown() {
        if (this.igxDropDown.collapsed) {
            this.igxDropDown.open({
                target: this.inputGroup.element.nativeElement,
                modal: false,
                positionStrategy: new ConnectedPositioningStrategy()
            });
        }
    }

}

class MySummary {
    public operate(data?: any[], allData = [], fieldName = ""): IgxSummaryResult[] {
        const result = [];
        result.push({
            key: "total",
            // label: "Total Items",
            summaryResult: IgxNumberSummaryOperand.sum(data)
        });
        console.log("result: ", result);
        return result;
    }
}
