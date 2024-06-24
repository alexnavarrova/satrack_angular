import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CategoryState} from "../state/category.state";

export const selectCategoryState = createFeatureSelector<CategoryState>('categoryState');

export const selectAllCategories = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.categories
);

export const selectCategoryLoading = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.loading
);

export const selectCategoryError = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.error
);
