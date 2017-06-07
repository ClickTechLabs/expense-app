import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public platform: Platform, private sqlite: SQLite) {
    this.refresh();
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
  	if (this.category_name == "") {
      //this.cmn.alert('Warning', 'Enter pool name');
    }
    else {
            let category_name =  this.category_name;
            let color =  this.colors;
            this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
              console.log('Zille' + this.category_name, this.colors);
                db.executeSql("INSERT INTO categories (name, color) VALUES (?, ?)", [category_name,color]).then((data) => {
                  console.log(data);
                	console.log("INSERTED: " + JSON.stringify(data));
                }, (error) => {
            		console.log("ERROR: " + JSON.stringify(error));
        		});
                });
            this.category_name = "";
            this.colors = "";

            this.refresh();
    }
  }

  refresh(){

      this.platform.ready().then(() => {
            this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM categories", []).then((data) => {
                  console.log(data);
                  this.categoryList = [];
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

  deleteCategory(id){
    console.log(id);
      this.platform.ready().then(() => {
            this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
                db.executeSql("DELETE FROM categories where id = (?)", [id]).then((data) => {
                  console.log(data);
                   this.refresh();
                }, (error) => {
                console.log("ERROR: " + JSON.stringify(error));
            });
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
  }


    editCategory($id, $name) {
      console.log($id);
    let prompt = this.alertCtrl.create({
      title: 'Edit Category Name',
      message: "Enter new name",
      inputs: [
        {
          name: 'name',
          value: $name,
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.save($id, data.name);
            console.log($id);
          }
        }
      ]
    });
    prompt.present();
  }

    save(id, categoryName) {
      console.log(id, categoryName);
    if (categoryName == "") {
      //this.cmn.alert('Warning', 'Enter pool name');
    }
    else {
          console.log(id , categoryName);
      this.platform.ready().then(() => {
            this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {

              console.log('zille');
                db.executeSql("UPDATE categories SET name = (?) where id = (?)", [categoryName, id]).then((data) => {
                  console.log(data);
                   this.refresh();
                }, (error) => {
                console.log("ERROR: " + JSON.stringify(error));
            });
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
    }
  }

/*    deleteCategory(obj, i) {
    console.log(obj);
    let index = this.categoryList.findIndex(x => x.category_name == obj);  //index of object
    console.log(index, i);
    if (index == i) {
      this.categoryList.splice(index, 1);
    }
  }*/

}
