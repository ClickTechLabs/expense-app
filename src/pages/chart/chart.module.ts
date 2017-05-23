import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import * as Chart from 'chart.js';

@NgModule({
  declarations: [
    Chart,
  ],
  imports: [
    IonicPageModule.forChild(Chart),
  ],
  exports: [
    Chart
  ]
})
export class ChartModule {}
