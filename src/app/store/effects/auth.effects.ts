import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of, tap} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpRequest
} from "../actions/auth.actions";

import {Router} from '@angular/router';
import {LocalStorageService} from "../../utils/local-storage.service";
import {SnackbarService} from "../../utils/snackbar.service";

@Injectable()
export class AuthEffects {

  constructor(
    private router: Router,
    private actions$: Actions,
    private snackbarService: SnackbarService,
    private localStorageService: LocalStorageService,
    private authService: AuthService) {
  }

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInRequest),
      mergeMap((action) =>
        this.authService.login(action.credentials).pipe(
          map((user: any) => {

            if (user?.error !== undefined) {
              let message = user.error.Message;
              return signInFailure({message});
            }
            return signInSuccess({user});
          })
        )
      )
    )
  );
  signInSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(signInSuccess),
        tap((action) => {
          this.localStorageService.save('user', action.user);
          this.snackbarService.showSuccess('Login successful!');
          this.router.navigate(['/']);
        })
      ),
    {dispatch: false}
  );
  signInFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(signInFailure),
        tap(action => {
          this.snackbarService.showError(action.message);
        })
      ),
    {dispatch: false}
  );
  signUpRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpRequest),
      mergeMap((action) =>
        this.authService.signUp(action.credentials).pipe(
          map((user: any) => {
            if (user?.error !== undefined) {
              let message = user.error.Message;
              return signInFailure({message});
            }
            return signUpSuccess(user);
          }),
          catchError((error) => of(signInFailure({message: error})))
        )
      )
    )
  );
  signUpSuccess = createEffect(() =>
      this.actions$.pipe(
        ofType(signUpSuccess),
        tap((action) => {
          this.snackbarService.showSuccess('Sign up successful!');
          this.router.navigate(['/auth/boxed-signin'])
        })
      ),
    {dispatch: false}
  );

}
