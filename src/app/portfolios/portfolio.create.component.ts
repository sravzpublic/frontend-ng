import { Component, Injectable, ViewChild, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuote, IPortfolioAsset, IPortfolio } from '../quotes/quotes.model';
import { ToastrService } from 'ngx-toastr';
import { PortfolioService } from './portfolio.service';
import { IPortfolioRaw, IPortfolioBulk } from './portfolio.model';
import { QuoteService } from '../quotes/quotes.service';
import { IgniteUIService } from '../ignite-ui/services/ignite-ui-service';
import { IIgniteUIMessage } from '../ignite-ui/services/ignite-ui-message-model';
import { PersistanceService } from '../common/persistance.service';


@Injectable()

@Component({
  templateUrl: './portfolio.create.component.html',
  selector: 'portfolio-create',
  styleUrls: ['./portfolio.create.component.scss']
})

export class PortfolioCreateComponent implements OnInit {
  public futureQuotes: IQuote[];
  public snpQuotes: IQuote[];
  public indexQuotes: IQuote[];
  public currencyQuotes: IQuote[];
  public ratesQuotes: IQuote[];
  public cryptoQuotes: IQuote[];
  public etfQuotes: IQuote[];
  public vixQuotes: IQuote[];
  public portfolioAssets: IPortfolioAsset[];
  public readOnly = false;

  constructor(private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private quoteService: QuoteService,
    private igniteUIService: IgniteUIService,
    private toastrService: ToastrService,
    private persistanceService: PersistanceService,
  ) {
  }


  public ngOnInit(): void {
    this.futureQuotes = this.route.snapshot.data['futureQuotes'];
    this.indexQuotes = this.route.snapshot.data['indexQuotes'];
    this.currencyQuotes = this.route.snapshot.data['currencyQuotes'];
    this.ratesQuotes = this.route.snapshot.data['ratesQuotes'];
    this.cryptoQuotes = this.route.snapshot.data['cryptoQuotes'];
    this.etfQuotes = this.route.snapshot.data['etfQuotes'];
  }

  onBulkPortfolioCreate(rawPortfolio: IPortfolioBulk) {
    console.log(rawPortfolio);
  }

  onPortfolioCreate(rawPortfolio: IPortfolioRaw) {
    // Total weight must be 100%
    // if (Math.floor(rawPortfolio.percent) !== 100) {
    //   this.toastrService.info(`Total portfolio weight is not 100% - Total weight ${rawPortfolio.percent}`,null, {
    //    positionClass: 'toast-bottom-center' });
    // }
    // Make sure to create a deep copy of the form-model
    const portfolio: IPortfolio = Object.assign({}, rawPortfolio);
    portfolio.portfolioassets = [];
    rawPortfolio.portfolioassets.forEach((o) => {
      if (o._id || o.id) {
        portfolio.portfolioassets.push({
          AssetId: o._id || o.id,
          SravzId: o.SravzId,
          purchaseprice: o.Last,
          quantity: o.Weight_Price/o.Last,
          weight: o.Weight_Pct,
          pnl: 0,
          value: o.Weight_Price,
          created: new Date()
        });
      }
    });
    // Allow 0 value portoflio
    // if (portfolio.portfolioassets.length > 0 && portfolio.cost > 0) {
      if (portfolio.portfolioassets.length > 0) {
      this.portfolioService.createPortfolio(portfolio)
        .subscribe(data => {
          if (!data.error) {
            this.toastrService.success('Portfolio Created', null, {
              positionClass: 'toast-bottom-center'
            });
          }
        }
        );
    } else {
      this.toastrService.info('Either selected portfolio assets or the portfolio value is 0', null, {
        positionClass: 'toast-bottom-center'
      });
    }
  }

  public onFetchSnpQuotes(selectedStartCharaters: string[]) {
    this.quoteService.
      getStockQuotesByTickerStartLetter(selectedStartCharaters.join(',')).subscribe((snpQuotes) => {
        this.snpQuotes = snpQuotes;
        const indexQuotesData: IIgniteUIMessage = {
          MessageID: this.igniteUIService.MESSAGE_IDS['SNPQUOTES'],
          Message: snpQuotes
        };
        this.igniteUIService.sendMessage(indexQuotesData);
      });
  }
}
