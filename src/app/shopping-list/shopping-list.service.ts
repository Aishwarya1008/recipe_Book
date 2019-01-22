import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  editIngredientIndex = new Subject<number>();
  ingredients: Ingredient[] = [{
    name: 'Apples', amount: 2
  }, {
    name: 'Tomatoes', amount: 5
  }];
  constructor() {
  }
  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredientByIndex(index: number) {
    return this.ingredients[index];
  }
  addIngredients(item: any) {
    this.ingredients.push({name: item.name, amount: item.amount});
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addToShoppingList(ingredients) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updatedIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deletingIgredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
