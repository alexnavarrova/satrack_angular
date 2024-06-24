import {createAction, props} from '@ngrx/store';

import {
  CategoryPostFailed,
  CategoryPostRequest,
  CategoryPostSuccess,
  LoadCategory,
  LoadCategorySuccess,
  LoadCategoryFailure
} from '../const/category.const';
import { CategoryModel } from '../models/category.model';

export const loadCategories = createAction(LoadCategory);
export const loadCategoriesSuccess = createAction(LoadCategorySuccess, props<{ categories: CategoryModel[] }>());
export const loadCategoriesFailure = createAction(LoadCategoryFailure, props<{ error: any }>());

export const postCategoryRequest = createAction(CategoryPostRequest, props<{ category: CategoryModel }>());
export const postCategorySuccess = createAction(CategoryPostSuccess, props<{ category: CategoryModel }>());
export const postCategoryFailure = createAction(CategoryPostFailed, props<{ error: any }>());

