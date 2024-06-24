import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TaskModel} from '../store/models/task.model';
import {catchError, map} from "rxjs/operators";
import {LocalStorageService} from "../utils/local-storage.service";
import {HttpHelperService} from "../utils/http-helper.service";
import {API_ROUTES} from "../shared/api-routes";
import { TaskCreateModel } from '../store/models/task.create.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpHelper: HttpHelperService, private localStorageService: LocalStorageService) {
  }

  getTasks(): Observable<TaskModel[]> {
    return this.httpHelper.get<TaskModel[]>(`${API_ROUTES.TASK.GET_TASKS}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  getTasksByCategoryId(categoryId: string): Observable<TaskModel[]> {
    return this.httpHelper.get<TaskModel[]>(`${API_ROUTES.TASK.GET_TASKS_BY_CATEGORY_ID(categoryId)}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  postTask(task: TaskCreateModel): Observable<TaskCreateModel> {

    return this.httpHelper.post<any>(`${API_ROUTES.TASK.POST_TASK}`, task)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return of(error);
        })
      );
  }

  putTask(task: TaskCreateModel): Observable<TaskCreateModel> {

    return this.httpHelper.put<any>(`${API_ROUTES.TASK.PUT_TASK()}`, task)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return of(error);
        })
      );
  }

  deleteTask(task: TaskModel): Observable<TaskModel> {

    return this.httpHelper.delete<any>(`${API_ROUTES.TASK.DELETE_TASK(task.id ? task.id.toString() : "")}`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return of(error);
        })
      );
  }

  completeTask(task: TaskModel): Observable<TaskModel> {

    return this.httpHelper.put<any>(`${API_ROUTES.TASK.COMPLETE_TASK()}`, task)
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
