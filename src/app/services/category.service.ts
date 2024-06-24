import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import {LocalStorageService} from "../utils/local-storage.service";
import {HttpHelperService} from "../utils/http-helper.service";
import {API_ROUTES} from "../shared/api-routes";
import { CategoryModel  } from '../store/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpHelper: HttpHelperService, private localStorageService: LocalStorageService) {
  }

  getCategories(): Observable<CategoryModel[]> {
    return this.httpHelper.get<CategoryModel[]>(`${API_ROUTES.CATEGORY.GET_CATEGORIES}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  postCategory(category: CategoryModel): Observable<CategoryModel> {

    return this.httpHelper.post<any>(`${API_ROUTES.CATEGORY.POST_CATEGORY}`, category)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return of(error);
        })
      );
  }

}
