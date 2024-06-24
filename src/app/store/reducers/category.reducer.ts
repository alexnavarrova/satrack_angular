import {createReducer, on} from '@ngrx/store';
import {
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesFailure,
  postCategoryRequest,
  postCategorySuccess,
  postCategoryFailure
} from "../actions/category.actions";

import {initialCategoryState} from "../state/category.state";


const _categoryReducer = createReducer(
  initialCategoryState,
  on(loadCategories, state => {
    return {
      ...state,
      loading: true,
      error: null
    }
  }),
  on(loadCategoriesSuccess, (state, {categories}) => {
    return {
      ...state,
      categories,
      loading: false
    }
  }),
  on(loadCategoriesFailure, state => {
    return {
      ...state,
      loading: false,
      error: null
    }
  }),
  on(postCategoryRequest, (state) => {
    return {
      ...state,
      loading: true,
      error: null
    }
  }),
  on(postCategorySuccess, state => {
    return {
      ...state,
      loading: false,
      error: null
    }
  }),
  on(postCategoryFailure, state => {
    return {
      ...state,
      loading: false,
      error: null
    }
  })
);

export function categoryReducer(state: any, action: any) {
  return _categoryReducer(state, action);
}
