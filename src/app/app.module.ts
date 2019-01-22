import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {myRoutes} from './routes';
import {HttpModule} from '@angular/http';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(myRoutes, {preloadingStrategy: PreloadAllModules}),
    CoreModule,
    AuthModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
