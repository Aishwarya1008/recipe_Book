import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recieveSelectedRecipe: Recipe;
  id: number;
  index: number;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private tostrService: ToastrService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recieveSelectedRecipe = this.recipeService.getRecipeById(this.id);
    });
  }

  addToShoppingList(ingredients) {
    this.recipeService.addToShoppingList(ingredients);
    this.tostrService.success('Items Added to Shopping-list', 'Items Added!');
  }
  editRecipe() {
    if (!this.authService.isAuthenticated()) {
      this.tostrService.info('Please Login with the registered email and password', 'Info');
    }
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  deleteRecipe() {
    if (this.authService.isAuthenticated()) {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['../'], {relativeTo: this.route});
    } else  {
      this.tostrService.info('Please Login with the registered email and password', 'Info');
    }
  }
}
