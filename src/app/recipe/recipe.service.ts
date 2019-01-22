import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
import {ApiService} from '../shared/api.service';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  recipes: Recipe[] = [
    {name: 'Egg Pizza', description: 'Super Tasty', imagePath: 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg', ingredients:[{name: 'Egg', amount: 5},{name: 'Tomatoes', amount: 5}]},
    {name: 'Pasta', description: 'Yummy! Very Delicious', imagePath: 'https://images.media-allrecipes.com/images/56589.png', ingredients:[{name: 'Tomatoes', amount: 2},{name: 'Potatoes', amount: 8}]}
  ];
  constructor(private shoppingListService: ShoppingListService) {
  }
  setRecipe(recipes) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes);
  }
getRecipe() {
  return this.recipes.slice();
}
addToShoppingList(ingredients) {
  this.shoppingListService.addToShoppingList(ingredients);
}
getRecipeById(index: number) {
    return this.recipes[index];
}
updateRecipe(index: number, editRecipe: Recipe) {
    console.log(editRecipe.ingredients);
    this.recipes[index] = editRecipe;
    this.recipeChanged.next(this.recipes.slice());
}
addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes.slice());
}
deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
}
}
