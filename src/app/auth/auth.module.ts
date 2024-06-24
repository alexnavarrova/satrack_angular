import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxedSigninComponent } from './boxed-signin/boxed-signin.component';
import { IconModule } from '../shared/icon/icon-module';
import { RouterModule, Routes } from '@angular/router';
import { BoxedSignupComponent } from './boxed-signup/boxed-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from '../utils/snackbar.service';
import { LoginGuard } from '../guard/login.guard';

const routes: Routes = [

  { path: 'auth/boxed-signin', component: BoxedSigninComponent, title: 'Boxed Signin' },
  { path: 'auth/boxed-signup', component: BoxedSignupComponent, title: 'Boxed Signup', canActivate: [LoginGuard] },

];

@NgModule({
  declarations: [
    BoxedSigninComponent,
    BoxedSignupComponent
  ],
  providers: [SnackbarService],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    CommonModule,
    IconModule
  ],
  exports: [
  ],
})
export class AuthModule { }
