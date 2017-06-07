import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Expense } from '../pages/expense/expense';
import { AddCategory } from '../pages/add-category/add-category';
import { Chart } from '../pages/chart/chart';
import { HomePage } from '../pages/home/home';
import {ChartsModule} from 'ng2-charts/charts/charts';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js'; 
import { NgCalendarModule } from 'ionic2-calendar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    MyApp,
    Expense,
    Chart,
    AddCategory,
    HomePage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Expense,
    Chart,
    AddCategory,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
