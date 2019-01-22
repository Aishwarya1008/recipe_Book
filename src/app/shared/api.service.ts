import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RecipeService} from '../recipe/recipe.service';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class ApiService {
  constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://my-recipe-book-2ea84.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipe());
  }
  fetchRecipes() {
    const token = this.authService.getToken();
    this.http.get('https://my-recipe-book-2ea84.firebaseio.com/recipes.json?auth=' + token).
    pipe(map((data) => {
      const recipes = data.json();
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      } return recipes;
    }))
      .subscribe((data) => {
        this.recipeService.setRecipe(data);
      });
  }
}
