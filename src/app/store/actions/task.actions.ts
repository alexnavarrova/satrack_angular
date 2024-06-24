import {createAction, props} from '@ngrx/store';
import {TaskModel} from '../models/task.model';

import {
  TaskDeleteFailed,
  TaskDeleteRequest,
  TaskDeleteSuccess,
  TaskPostFailed,
  TaskPostRequest,
  TaskPostSuccess,
  TaskPutFailed,
  TaskPutRequest,
  TaskPutSuccess,
  LoadTasks,
  LoadTasksSuccess,
  LoadTasksFailure,
  LoadTasksByCategoryId,
  LoadTasksByCategoryIdSuccess,
  LoadTasksByCategoryIdFailure,
  TaskCompleteRequest,
  TaskCompleteSuccess,
  TaskCompleteFailed
} from '../const/task.const';
import { TaskCreateModel } from '../models/task.create.model';

export const loadTasks = createAction(LoadTasks);
export const loadTasksSuccess = createAction(LoadTasksSuccess, props<{ tasks: TaskModel[] }>());
export const loadTasksFailure = createAction(LoadTasksFailure, props<{ error: any }>());

export const postTaskRequest = createAction(TaskPostRequest, props<{ task: TaskCreateModel }>());
export const postTaskSuccess = createAction(TaskPostSuccess, props<{ task: TaskCreateModel }>());
export const postTaskFailure = createAction(TaskPostFailed, props<{ error: any }>());

export const putTaskRequest = createAction(TaskPutRequest, props<{ task: TaskCreateModel }>());
export const putTaskSuccess = createAction(TaskPutSuccess, props<{ task: TaskCreateModel }>());
export const putTaskFailure = createAction(TaskPutFailed, props<{ error: any }>());

export const deleteTaskRequest = createAction(TaskDeleteRequest, props<{ task: TaskModel }>());
export const deleteTaskSuccess = createAction(TaskDeleteSuccess, props<{ task: TaskModel }>());
export const deleteTaskFailure = createAction(TaskDeleteFailed, props<{ error: any }>());

export const completeTaskRequest = createAction(TaskCompleteRequest, props<{ task: TaskModel }>());
export const completeTaskSuccess = createAction(TaskCompleteSuccess, props<{ task: TaskModel }>());
export const completeTaskFailure = createAction(TaskCompleteFailed, props<{ error: any }>());

export const loadTasksByCategoryIdRequest = createAction(LoadTasksByCategoryId, props<{ categoryId: string }>());
export const loadTasksByCategoryIdSuccess = createAction(LoadTasksByCategoryIdSuccess, props<{ tasks: TaskModel[] }>());
export const loadTasksByCategoryIdFailure = createAction(LoadTasksByCategoryIdFailure, props<{ error: any }>());
