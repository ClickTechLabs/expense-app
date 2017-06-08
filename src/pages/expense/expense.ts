import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@IonicPage()
@Component({
  selector: 'page-expense',
  templateUrl: 'expense.html',
})
export class Expense implements OnInit {

	private expense: FormGroup;
  categoryList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public platform: Platform, private sqlite: SQLite) {

    this.loadData();
  }


  ngOnInit() {
    this.expense = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });

    console.log(this.expense);
  }

  loadData(){
       this.platform.ready().then(() => {
            this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM categories", []).then((data) => {
                  console.log(data);
                             if(data.rows.length > 0) {
                          for(var i = 0; i < data.rows.length; i++) {
                            this.categoryList.push({ category_name: data.rows.item(i).name, color: data.rows.item(i).color, id: data.rows.item(i).id });
                      }
                      console.log(this.categoryList);
                  }
                }, (error) => {
                console.log("ERROR: " + JSON.stringify(error));
            });
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
  }

    expenseForm(){
    	console.log(this.expense.value.name, this.expense.value.category, this.expense.value.cost, this.expense.value.date);

            let name =  this.expense.value.name;
            let category =  this.expense.value.category;
            let cost =  this.expense.value.cost;
            let date =  this.expense.value.date;
       this.platform.ready().then(() => {
            this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
                db.executeSql("INSERT INTO expense (name, category, cost, date) VALUES (?, ?, ?, ?)", [name, category, cost, date]).then((data) => {
                  console.log("Data Inserted in Expense Table" + data);
                  console.log("INSERTED: " + JSON.stringify(data));
                }, (error) => {
                console.log("ERROR: " + JSON.stringify(error));
            });
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });

       this.expense.reset();
  }

  ionViewDidLoad() {
    console.log('Expense Page');
  }



}
