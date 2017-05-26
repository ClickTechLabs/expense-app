import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the AddCategory page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategory {

public database: SQLite;
  category_name: string = "";
  colors: string = "";
  categoryList: any = [];
  people: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private sqlite: SQLite) {
  	this.platform.ready().then(() => {
	  		this.sqlite.create({ name: 'data.db', location: 'default' }).then((db: SQLiteObject) => {
					    db.executeSql('CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32), color VARCHAR(32))', {}).then((data) => {
					    	console.log("TABLE CREATED: ", data);
					    }, (error) => {
						    console.error("Unable to execute sql", error);
						})
				}, (error) => {
					console.error("Unable to open database", error);
				});
  		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCategory');
  }

/*  databaseConectivity(){
  	        this.platform.ready().then(() => {
  	        this.database = new SQLite();
            this.database.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
                db.executeSql('INSERT INTO categories (name, color) VALUES (this.name, this.colors)', {}).then((data) => {
                	console.log("INSERTED: " + JSON.stringify(data));
                }, (error) => {
            		console.log("ERROR: " + JSON.stringify(error.err));
        		});
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
  }*/

  addCategory(){
  	console.log(this.colors);
  	if (this.category_name == "") {
      //this.cmn.alert('Warning', 'Enter pool name');
    }
    else {
    	//error here
  	        this.database = new SQLite();
                db.executeSql('INSERT INTO categories (name, color) VALUES (this.name, this.colors)', {}).then((data) => {
                	console.log("INSERTED: " + JSON.stringify(data));
                }, (error) => {
            		console.log("ERROR: " + JSON.stringify(error.err));
        		});

      this.categoryList.push({ category_name: this.category_name, color: this.colors });
      this.category_name = "";
      this.colors = "";
      console.log(this.categoryList);
    }
  }

  refresh(){
  	  this.platform.ready().then(() => {
  	        this.database = new SQLite();
            this.database.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM people", {}).then((data) => {
                	           if(data.rows.length > 0) {
                					for(var i = 0; i < data.rows.length; i++) {
                    				this.categoryList.push({ category_name: data.rows.item(i).name, color: data.rows.item(i).color});
			                }
			            }
                }, (error) => {
            		console.log("ERROR: " + JSON.stringify(error.err));
        		});
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
  }

    deleteCategory(obj, i) {
    console.log(obj);
    let index = this.categoryList.findIndex(x => x.category_name == obj);  //index of object
    console.log(index, i);
    if (index == i) {
      this.categoryList.splice(index, 1);
    }
  }

}
