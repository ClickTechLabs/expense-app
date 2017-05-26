import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class Chart {

  chartOptions: any = { scaleShowVerticalLines: false, responsive: true };
  chartLabels: string[] = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];
  chartType: string = 'bar';
  chartLegend: boolean = true;
  chartData: any[] = [{ data: [75, 80, 45, 100], label: 'Student A' }, { data: [80, 55, 75, 95], label: 'Student B' }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Chart');
  }

    // Doughnut
  public doughnutchartColors: any[] = [{ backgroundColor:["#FF7360", "#6FC8CE", "#FAFFF2"] }];
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
