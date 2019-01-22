import {PayAction} from '../shared/actions.model';
import {Ingredient} from '../shared/ingredient.model';

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS to shopping-list';

export class AddIngredients implements PayAction {
  readonly type = ADD_INGREDIENTS;
  constructor (public payload: Ingredient) {}
}
