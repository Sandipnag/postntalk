import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.hide();
  }

  lineChartData1: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Billing cycle of vendors' },
    
  ];

  lineChartData2: ChartDataSets[] = [
    { data: [50, 48, 39, 19, 100, 56, 90], label: 'Registration cycle of Customer' },
  ];
  
  lineChartData3: ChartDataSets[] = [
    { data: [57, 48, 88, 19, 29, 27, 54], label: 'Billing cycle of Agent' },
  ];

  lineChartLabels1: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  lineChartLabels2: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  lineChartLabels3: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  lineChartOptions: ChartOptions = {
    responsive: true
  };

  lineChartColors1: Color[] = [

    {
      borderColor: "rgb(0, 195, 101)",
      backgroundColor: 'rgba(0, 195, 101, 0.5)',
    },
    
  ];
  lineChartColors2: Color[] = [
    {
      borderColor: 'rgb(3, 186, 252,1)',
      backgroundColor: 'rgba(3, 186, 252, 0.4)',
    },
  ];
  lineChartColors3: Color[] = [
    {
      borderColor: 'rgb(60, 60, 60)',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  ];

  lineChartLegend = true;

  // Define type of chart
  lineChartType = 'line';

  lineChartPlugins = [];

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return data.datasets[0].data[tooltipItems.index] + ' %';
        }
      }
    },
  };

  pieChartLabels: Label[] = ['Nitrogen', 'Oxygen', 'Argon', 'Carbon dioxide'];

  pieChartData: number[] = [78.09, 20.95, 0.93, 0.03];

  pieChartType = 'pie';

  pieChartLegend = true;

  pieChartPlugins = [];

  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

}
