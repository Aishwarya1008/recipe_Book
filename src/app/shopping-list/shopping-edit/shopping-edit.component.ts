import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ShoppingListService} from '../shopping-list.service';
import {Ingredient} from '../../shared/ingredient.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
itemName = new FormControl(null, [Validators.required]);
itemAmount = new FormControl(null, [Validators.required]);
formGroup: FormGroup;
editItemIndex: number;
editItem: Ingredient;
editMode = false;
subscription: Subscription;
  constructor(private shoppingListservice: ShoppingListService) {
    this.formGroup = new FormGroup({
      name: this.itemName,
      amount: this.itemAmount
    });
  }

  ngOnInit() {
    this.subscription = this.shoppingListservice.editIngredientIndex.subscribe((index: number) => {
      this.editMode = true;
      this.editItemIndex = index;
      this.editItem = this.shoppingListservice.getIngredientByIndex(index);
      this.formGroup.setValue({name: this.editItem.name, amount: this.editItem.amount});
    });
  }
  addItems() {
    if (this.editMode) {
      this.shoppingListservice.updatedIngredient(this.editItemIndex, this.editItem);
    } else {
      this.shoppingListservice.addIngredients({name: this.itemName.value, amount: this.itemAmount.value});
    }
    this.editMode = false;
    this.formGroup.reset();
  }
  clearForm() {
    this.formGroup.reset();
    this.editMode = false;
  }
  deleteItem() {
    if (this.editMode) {
      this.shoppingListservice.deletingIgredient(this.editItemIndex);
      this.formGroup.reset();
    }
    this.editMode = false;
  }
  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
