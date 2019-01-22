import {Routes} from '@angular/router';

export const myRoutes: Routes = [{
  path: 'recipe',
  loadChildren: './recipe/recipes.module#RecipesModule'
}, {
  path: 'shopping-list',
  loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
}];
