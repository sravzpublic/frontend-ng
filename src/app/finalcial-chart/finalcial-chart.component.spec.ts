import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalcialChartComponent } from './finalcial-chart.component';

describe('FinalcialChartComponent', () => {
  let component: FinalcialChartComponent;
  let fixture: ComponentFixture<FinalcialChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalcialChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalcialChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
