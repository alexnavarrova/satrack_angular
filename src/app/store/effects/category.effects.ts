import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import {SnackbarService} from "../../utils/snackbar.service";
import { loadCategories, loadCategoriesFailure, loadCategoriesSuccess, postCategoryRequest, postCategorySuccess,  } from '../actions/category.actions';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class CategoryEffects {

  constructor(
    private actions$: Actions,
    private snackbarService: SnackbarService,
    private categoryService: CategoryService) {
  }


  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      mergeMap(() =>
        this.categoryService.getCategories().pipe(
          map(categories => {
            return loadCategoriesSuccess({ categories });
          }),
          catchError(error => of(loadCategoriesFailure({ error })))
        )
      )
    )
  );

  postCategoryRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postCategoryRequest),
      mergeMap((action) =>
        this.categoryService.postCategory(action.category).pipe(
          map((category) => {
            this.snackbarService.showSuccess('Category was created successfully');
            return postCategorySuccess({category})
          }),
          catchError((error) => {
            this.snackbarService.showError('Failed to create category');
            return of(loadCategoriesFailure({error}));
          })
        )
      ),
      switchMap(() => [
        loadCategories()
      ])
    )
  );


}
