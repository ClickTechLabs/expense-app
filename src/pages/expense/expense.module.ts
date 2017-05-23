import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Expense } from './expense';

@NgModule({
  declarations: [
    Expense,
  ],
  imports: [
    IonicPageModule.forChild(Expense),
  ],
  exports: [
    Expense
  ]
})
export class ExpenseModule {}
