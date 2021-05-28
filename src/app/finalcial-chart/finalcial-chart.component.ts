import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FinancialChartType, FinancialChartVolumeType, FinancialChartZoomSliderType, FinancialIndicatorType, FinancialOverlayType, IgxFinancialChartComponent } from 'igniteui-angular-charts';
import { StockDataService } from '../services/stock-data.service';

@Component({
  selector: 'app-finalcial-chart',
  templateUrl: './finalcial-chart.component.html',
  styleUrls: ['./finalcial-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinalcialChartComponent implements OnInit {

  public data: any[];
  @ViewChild("chart", { static: true })
  public chart: IgxFinancialChartComponent;

  constructor(private dataService: StockDataService) { }

  ngOnInit(): void {
    this.data = this.dataService.getDataConditional(1);
  }

  public ngAfterViewInit(): void {

    this.chart.chartType = FinancialChartType.Candle;
    this.chart.zoomSliderType = FinancialChartZoomSliderType.Candle;
    this.chart.volumeType = FinancialChartVolumeType.Area;
    this.chart.indicatorTypes.add(FinancialIndicatorType.ForceIndex);
    this.chart.overlayTypes.add(FinancialOverlayType.PriceChannel);
  }

  onOptionSelect(event) {
    this.data = this.dataService.getDataConditional(parseInt(event.target.value));
  }

}
