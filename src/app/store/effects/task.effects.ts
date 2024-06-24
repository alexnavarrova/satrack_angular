import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, tap, switchMap} from 'rxjs/operators';

import {
  deleteTaskRequest,
  postTaskRequest,
  postTaskSuccess,
  putTaskRequest,
  putTaskSuccess,
  deleteTaskSuccess,
  loadTasks,
  loadTasksSuccess,
  loadTasksFailure,
  completeTaskRequest,
  completeTaskSuccess,
  loadTasksByCategoryIdRequest,
  loadTasksByCategoryIdSuccess,
  loadTasksByCategoryIdFailure,
} from '../actions/task.actions';

import {SnackbarService} from "../../utils/snackbar.service";
import { TaskService } from '../../services/task.service';

@Injectable()
export class TaskEffects {

  constructor(
    private actions$: Actions,
    private snackbarService: SnackbarService,
    private taskService: TaskService) {
  }

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => {
            return loadTasksSuccess({ tasks });
          }),
          catchError(error => of(loadTasksFailure({ error })))
        )
      )
    )
  );

  loadTasksByCategoryId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasksByCategoryIdRequest),
      tap((action) => console.info('Action received:', action)),
      mergeMap((action) =>
        this.taskService.getTasksByCategoryId(action.categoryId).pipe(
          map((tasks) => {
            return loadTasksByCategoryIdSuccess({ tasks });
          }),
          catchError((error) => {
            this.snackbarService.showError('Failed to complete task');
            return of(loadTasksByCategoryIdFailure({error}));
          })
        )
      )
    )
  );

  postTaskRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postTaskRequest),
      mergeMap((action) =>
        this.taskService.postTask(action.task).pipe(
          map((task) => postTaskSuccess({task})),
          catchError((error) => {
            this.snackbarService.showError('Failed to create task');
            return of(loadTasksFailure({error}));
          })
        )
      ),
      switchMap(() => [
        loadTasks()
      ])
    )
  );

  putTaskRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(putTaskRequest),
      mergeMap((action) =>
        this.taskService.putTask(action.task).pipe(
          map((task) => putTaskSuccess({task})),
          catchError((error) => {
            this.snackbarService.showError('Failed to update task');
            return of(loadTasksFailure({error}));
          })
        )
      ),
      switchMap(() => [
        loadTasks()
      ])
    )
  );

  deleteTaskRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTaskRequest),
      tap((action) => console.info('Action received:', action)),
      mergeMap((action) =>
        this.taskService.deleteTask(action.task).pipe(
          map(() => deleteTaskSuccess({task: action.task})),
          catchError((error) => {
            this.snackbarService.showError('Failed to delete task');
            return of(loadTasksFailure({error}));
          })
        )
      ),
      switchMap(() => [
        loadTasks()
      ])
    )
  );

  completeTaskRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(completeTaskRequest),
      tap((action) => console.info('Action received:', action)),
      mergeMap((action) =>
        this.taskService.completeTask(action.task).pipe(
          map(() => completeTaskSuccess({task: action.task})),
          catchError((error) => {
            this.snackbarService.showError('Failed to complete task');
            return of(loadTasksFailure({error}));
          })
        )
      ),
      switchMap(() => [
        loadTasks()
      ])
    )
  );

}
