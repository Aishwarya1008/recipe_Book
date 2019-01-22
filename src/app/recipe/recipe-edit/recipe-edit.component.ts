import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  // imageUrl = new FormControl(null, [Validators.required]);
  // description = new FormControl(null, [Validators.required]);
  // recipeName = new FormControl(null, [Validators.required]);
  ingredients: Ingredient[] = [];
  // ingredientName = new FormControl(null, Validators.required);
  // ingredientAmount = new FormControl(null, Validators.required);
  editRecipe: Recipe;
  recipeForm: FormGroup;
  // ingrid = new FormArray([]);
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
    // this.formGroup = new FormGroup({
    //   ingrName: this.ingredientName,
    //   descrip: this.description,
    //   imgUrl: this.imageUrl,
    //   ingrAmt: this.ingredientAmount,
    //   reciName: this.recipeName
    // });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] >= 0;
      if (this.editMode) {
        this.editRecipe = this.recipeService.getRecipeById(this.id);
      }
        this.initForm();
        // if (this.editRecipe) {
        //   this.description.setValue(this.editRecipe.description);
        //   this.imageUrl.setValue(this.editRecipe.imagePath);
        //   this.recipeName.setValue(this.editRecipe.name);
        //   if (this.editRecipe.ingredients) {
        //     this.ingredients = this.editRecipe.ingredients;
        //     for (const ingri of this.ingredients) {
        //       this.ingredients.push(new FormGroup({
        //         'name': this.ingredientName,
        //         'amount': this.ingredientAmount
        //       }));
        //       // this.ingredientName.setValue(ingri.name);
        //       // this.ingredientAmount.setValue(ingri.amount);
        //     }
        //   }
        // }
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredient = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (const ingri of recipe.ingredients) {
          recipeIngredient.push(new FormGroup({
            'name': new FormControl(ingri.name, Validators.required),
            'amount': new FormControl(ingri.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/ )])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredient
    });
  }

  onAddIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/ )])
    }));
  }
  onCancel(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onCancelRecipe() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onSubmit() {
    console.log(this.recipeForm);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else  {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancelRecipe();
  }
}
