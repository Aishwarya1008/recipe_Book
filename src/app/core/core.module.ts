import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {myCoreRoutes} from './core.routing';
import {MatButtonModule, MatMenuModule} from '@angular/material';
import {AuthService} from '../auth/auth.service';
import {RecipeService} from '../recipe/recipe.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {AuthGuardService} from '../auth/authGuard.service';
import {ApiService} from '../shared/api.service';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(myCoreRoutes),
    MatButtonModule,
    MatMenuModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [RecipeService, ShoppingListService, ApiService, AuthService, AuthGuardService]
})
export class CoreModule {

}
