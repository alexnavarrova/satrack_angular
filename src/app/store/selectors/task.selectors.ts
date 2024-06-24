import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TaskState} from "../state/task-user.state";

export const selectTaskState = createFeatureSelector<TaskState>('taskState');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

export const selectTaskLoading = createSelector(
  selectTaskState,
  (state: TaskState) => state.loading
);

export const selectTaskError = createSelector(
  selectTaskState,
  (state: TaskState) => state.error
);




