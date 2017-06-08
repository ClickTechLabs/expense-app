import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  expenseList: any = [];
  getCalenderDateTime:  string;
  getPickupDate:  any;
  finalSearchDate:  string;
    eventSource;
    viewTitle;
    isToday: boolean;
    loaded: boolean = false;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    }; // these are the variable used by the calendar.

  constructor(public navCtrl: NavController, public platform: Platform, private sqlite: SQLite, public alertCtrl: AlertController) {
    let today = new Date();
   /* var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();*/
    this.getPickupDate = today
    this.calculateDateTime(today);
    console.log(today);
  }


    editExpense(id, name, category, cost, date) {
      console.log(id);
    let prompt = this.alertCtrl.create({
      title: 'Edit Expense',
      inputs: [
        {
          name: 'name',
          value: name,
          placeholder: 'Name'
        },
        {
          name: 'category',
          value: category,
          placeholder: 'Category'
        },
        {
          name: 'cost',
          value: cost,
          placeholder: 'Cost'
        },
        {
          name: 'date',
          type: 'date',
          value: date,
          placeholder: 'Date'
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
            this.save(id, data.name, data.category, data.cost, data.date);
            console.log(id);
          }
        }
      ]
    });
    prompt.present();
  }

    save(id, Name, Category, Cost, Date) {
      console.log(id, Category, Cost, Date);
    if (Name == "" || Category == "" || Cost == "" || Date == "") {
      //this.cmn.alert('Warning', 'Enter pool name');
    }
    else {
          console.log(id , Name, Category, Cost, Date);
      this.platform.ready().then(() => {
            this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {

              console.log('zille');
                db.executeSql("UPDATE expense SET (name, category, cost, date) = (?, ?, ?, ?) where id = (?)", [Name, Category, Cost, Date, id]).then((data) => {
                  console.log(data);
                  console.log(this.getPickupDate);
                   this.calculateDateTime(this.getPickupDate);
                }, (error) => {
                console.log("ERROR: " + JSON.stringify(error));
            });
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
    }
  }

    deleteExpense(id, name, category, cost) {
    let confirm = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete Expense ?? <br><strong>Name:</strong>&nbsp;' + name + '&nbsp;<br><strong>Categoty:</strong>&nbsp;' + category + '&nbsp;<br><strong>Cost:</strong>&nbsp;$' + cost,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.deleteExpenseConfirmed(id);
          }
        }
      ]
    });
    confirm.present();
  }


    deleteExpenseConfirmed(id){
    console.log(id);
      this.platform.ready().then(() => {
            this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
                db.executeSql("DELETE FROM expense where id = (?)", [id]).then((data) => {
                  console.log(data);
                   this.calculateDateTime(this.getPickupDate);
                }, (error) => {
                console.log("ERROR: " + JSON.stringify(error));
            });
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
  }


  calculateDateTime(date){
      this.getCalenderDateTime = String(date);
      let strMnth: string    = this.getCalenderDateTime.substring(4,7);
      let day: string = this.getCalenderDateTime.substring(8,10);
      let year: string       = this.getCalenderDateTime.substring(11,15);
      let strMonth: string ;
          if(strMnth=='Jan')
             strMonth ='01';
          else if (strMnth == 'Feb' )
             strMonth ='02';
          else if (strMnth == 'Mar' )
             strMonth ='03';
          else if (strMnth == 'Apr' )
             strMonth ='04';
          else if (strMnth == 'May' )
             strMonth ='05';
          else if (strMnth == 'Jun' )
             strMonth ='06';
          else if (strMnth == 'Jul' )
             strMonth ='07';
          else if (strMnth == 'Aug' )
             strMonth ='08';
          else if (strMnth == 'Sep' )
             strMonth ='09';
          else if (strMnth == 'Oct' )
             strMonth ='10';
          else if (strMnth == 'Nov' )
             strMonth ='11';
          else if (strMnth == 'Dec' )
             strMonth ='12';

this.finalSearchDate = year + '-' + strMonth + '-' + day;
this.searchDate(this.finalSearchDate);
  }

  searchDate(date){
    console.log(date);
        this.platform.ready().then(() => {
            this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
                db.executeSql("SELECT * FROM expense where date = (?)", [date]).then((data) => {
                  console.log("Expense Data" + data);
                  this.expenseList = [];
                             if(data.rows.length > 0) {
                          for(var i = 0; i < data.rows.length; i++) {
                            this.expenseList.push({ name: data.rows.item(i).name, category: data.rows.item(i).category, id: data.rows.item(i).id, cost: data.rows.item(i).cost, date: data.rows.item(i).date });
                      }
                      if(this.expenseList.length > 0){
                        this.loaded = true;
                      }else{
                        this.loaded = false;
                      }
                      console.log(this.expenseList);
                  }
                }, (error) => {
                console.log("ERROR: " + JSON.stringify(error));
            });
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
  }







    loadEvents() {
        this.eventSource = this.createRandomEvents();
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
        console.log(this.viewTitle);
    }
    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }
    changeMode(mode) {
        this.calendar.mode = mode;
    }
    today() {
        this.calendar.currentDate = new Date();
            let today = new Date();
            let todayDate = today.getFullYear() + '-' + '0' + (today.getMonth()+1) + '-' + '0' + today.getDate();
            this.searchDate(todayDate);
    }
    onTimeSelected(ev) {
      this.getPickupDate = ev.selectedTime;
      console.log("Hello" + this.getPickupDate);
      this.calculateDateTime(ev.selectedTime);
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }
    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
        console.log(this.isToday);
    }
    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

}
