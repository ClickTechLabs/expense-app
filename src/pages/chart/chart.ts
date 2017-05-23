import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class Chart {

  chartOptions: any;
  chartLabels: string[];
  chartType: string;
  chartLegend: boolean;
  chartData: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.chartShow();
  }

  chartShow(){
  this.chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
 
  this.chartLabels = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];
  this.chartType = 'bar';
  this.chartLegend = true;
 
  this.chartData = [
    { data: [75, 80, 45, 100], label: 'Student A' },
    { data: [80, 55, 75, 95], label: 'Student B' }
  ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Chart');
  }

}
