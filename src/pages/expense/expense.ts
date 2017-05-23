import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-expense',
  templateUrl: 'expense.html',
})
export class Expense implements OnInit {

	private expense: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
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

    expenseForm(){
    	console.log(this.expense);
  }

  ionViewDidLoad() {
    console.log('Expense Page');
  }

}
