import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Expense } from '../pages/expense/expense';
import { Chart } from '../pages/chart/chart';
import { AddCategory } from '../pages/add-category/add-category';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Expense;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private sqlite: SQLite) {
        this.platform.ready().then(() => {
        this.sqlite.create({ name: 'data.db', location: 'default' }).then((db: SQLiteObject) => {

//Categories table created
              db.executeSql('CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32), color VARCHAR(32))', {}).then((data) => {
                 console.log('Categories Table');
                console.log("TABLE CREATED: ", data);
              }, (error) => {
                console.error("Unable to execute sql", error);
            })


//Expense table created
              db.executeSql('CREATE TABLE IF NOT EXISTS expense(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32), category VARCHAR(32), cost INT(15), date VARCHAR(32))', {}).then((data) => {
                 console.log('Expense Table');
                console.log("TABLE CREATED: ", data);
              }, (error) => {
                console.error("Unable to execute sql", error);
            })
        }, (error) => {
          console.error("Unable to open database", error);
        });
      });
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Expense', component: Expense },
      { title: 'Categories', component: AddCategory },
      { title: 'Chart', component: Chart }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
