import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipeService} from './recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private tostrService: ToastrService) {
  }

  ngOnInit() {
  }
  newRecipe() {
    if (!this.authService.isAuthenticated()) {
      this.tostrService.info('Please Login with the registered email and password', 'Info');
    }
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
