import { CategoryModel } from '../models/category.model';

export interface CategoryState {
  categories: CategoryModel[];
  loading: boolean;
  error: any;
}

export const initialCategoryState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};
