import {createAction, props} from '@ngrx/store';
import {
  SignInFailed,
  SignInRequest,
  SignInSuccess,
  SignUpFailed,
  SignUpRequest,
  SignUpSuccess
} from '../const/auth.const';
import { UserModel } from '../models/user.model';


export const signInRequest
  = createAction(SignInRequest, props<{ credentials: { email: string, password: string } }>());

export const signInSuccess = createAction(SignInSuccess, props<{ user: UserModel }>());

export const signInFailure = createAction(SignInFailed, props<{ message: any }>());

export const signUpRequest
  = createAction(SignUpRequest, props<{
  credentials: { name: string, lastName: string, email: string, password: string, confirmPassword: string }
}>());

export const signUpSuccess = createAction(SignUpSuccess, props<{ user: any }>());


export const signUpFailure = createAction(SignUpFailed, props<{ error: any }>());
