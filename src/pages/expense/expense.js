var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
var Expense = (function () {
    function Expense(navCtrl, navParams, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
    }
    Expense.prototype.ngOnInit = function () {
        this.expense = this.formBuilder.group({
            name: ['', [Validators.required]],
            category: ['', [Validators.required]],
            cost: ['', [Validators.required]],
            date: ['', [Validators.required]],
        });
        console.log(this.expense);
    };
    Expense.prototype.expenseForm = function () {
        console.log(this.expense);
    };
    Expense.prototype.ionViewDidLoad = function () {
        console.log('Expense Page');
    };
    return Expense;
}());
Expense = __decorate([
    IonicPage(),
    Component({
        selector: 'page-expense',
        templateUrl: 'expense.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder])
], Expense);
export { Expense };
//# sourceMappingURL=expense.js.map