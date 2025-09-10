import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPortfolio } from './portfolio.model';

import { PortfolioService } from './portfolio.service';


import { PortfolioTearsheetComponent } from '../tearsheet/portfolio.tearsheet.component';
import { IPortfolioAsset } from '../quotes/quotes.model';
import { IgxDialogComponent } from '@infragistics/igniteui-angular';

@Component({
  templateUrl: './portfolio.list.component.html'
})



export class PortfolioListComponent implements OnInit  {
  public portfolios: IPortfolio[];
  public portfolioAssets: IPortfolioAsset[];
  public modalHeader: string;
  public modalSubmitButtonText: string;
  public enableSubmitButton: boolean;
  public defaultColDef;
  public showDelete: boolean;
  public showUpdate: boolean;
  public showDetails: boolean;
  public selectedPortfolio: IPortfolio;
  public portfolioName: string;
  public portfolioToDelete: any;

  @ViewChild(IgxDialogComponent, { static: false }) public dialog: IgxDialogComponent;
  @ViewChild(PortfolioTearsheetComponent, {static: false}) portfolioTearsheetComponent: PortfolioTearsheetComponent;

  constructor(private route: ActivatedRoute,
    private portfolioService: PortfolioService) {

    this.showDelete = true;
    this.showUpdate = false;
    this.showDetails = true;
  }

  ngOnInit() {
    this.portfolios = this.route.snapshot.data['portfolios'];
  }

  public resetUI() {
    this.selectedPortfolio = null;
    this.portfolioAssets = null;
  }

  public RowDetails(cell) {
    if (this.selectedPortfolio !== cell) {
      this.resetUI();
      this.selectedPortfolio = cell;
      this.portfolioAssets = cell.portfolioassets;
      this.portfolioName = cell.name;
      this.portfolioTearsheetComponent.RequestData(cell.name, cell.user?._id, null);
    }
  }

  public OpenModal(modalHeader, modalSubmitButtonText) {
    this.modalHeader = modalHeader;
    this.modalSubmitButtonText = modalSubmitButtonText;
    this.dialog.open();
  }

  public CloseModal() {
    this.portfolioToDelete = null;
    this.dialog.close();
  }

  public DeleteOrUpdate() {
    if (this.portfolioToDelete) {
      this.portfolioService.deletePortfolio(this.portfolioToDelete._id)
        .subscribe(() => {
          this.portfolioService.getAllPortfolios().subscribe((portfolios) => {
            this.portfolios = portfolios;
          });
          this.CloseModal();
        });
    }
  }

  public DeleteRow(cell) {
    this.enableSubmitButton = true;
    this.portfolioToDelete = cell;
    this.OpenModal('Delete Portfolio', 'Delete');
  }

}
