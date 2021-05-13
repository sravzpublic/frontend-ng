import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectedPositioningStrategy, IgxDropDownComponent, IgxInputGroupComponent, ISelectionEventArgs } from 'igniteui-angular';
import * as data from '../data/gspc.json';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild(IgxDropDownComponent, { static: true }) public igxDropDown: IgxDropDownComponent;
  @ViewChild("inputGroup", { read: IgxInputGroupComponent, static: true }) public inputGroup: IgxInputGroupComponent;

  companyData: any = (data as any).default;
  chartData: any[] = [];
  type: string = "Column";
  public items: { field: string }[] = [
    { field: "Area" },
    { field: "Auto" },
    { field: "Column" },
    { field: "Line" },
    { field: "Point" },
    { field: "Spline" },
    { field: "SplineArea" },
    { field: "StepArea" },
    { field: "StepLine" },
    { field: "Waterfall" },

];
  currentYear: Date = new Date();


  constructor() { }

  ngOnInit(): void {

    this.chartData = Array.from(new Set(this.companyData.map(s => s.Sector)))
      .map(params => {
        return {
          name: params,
          value: this.companyData.filter(opts => opts.Sector == params).length
        }
      });      

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

  public onDDLSelection(eventArgs: ISelectionEventArgs) {
    this.type = eventArgs.newSelection.value;
    
    // eventArgs.cancel = true;
}

}
