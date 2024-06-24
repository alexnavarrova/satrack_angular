import {createReducer, on} from '@ngrx/store';
import {signInFailure, signInRequest, signInSuccess, signUpRequest, signUpSuccess} from '../actions/auth.actions';
import { initialAuthState } from '../state/auth.state';


const _authReducer = createReducer(
  initialAuthState,
  on(signInRequest, state => ({
    ...state,
    loading: true,
    message: null
  })),
  on(signInSuccess, (state, {user}) => {
    return {
      ...state,
      user,
      loading: false,
      error: null
    }
  }),
  on(signInFailure, (state, {message}) => ({
    ...state,
    user: null,
    loading: false,
    message
  })),
  on(signUpRequest, state => ({
    ...state,
    loading: true,
    message: null
  })),
  on(signUpSuccess, (state, {user}) => ({
    ...state,
    loading: false,
    message: null
  })),
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
