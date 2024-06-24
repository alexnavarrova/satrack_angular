import {createReducer, on} from '@ngrx/store';
import {
  deleteTaskRequest,
  loadTasks,
  loadTasksSuccess,
  loadTasksFailure,
  postTaskFailure,
  postTaskRequest,
  postTaskSuccess,
  completeTaskRequest,
  loadTasksByCategoryIdRequest,
  loadTasksByCategoryIdSuccess,
  loadTasksByCategoryIdFailure
} from "../actions/task.actions";
import {initialTaskState} from "../state/task-user.state";


const _taskReducer = createReducer(
  initialTaskState,
  on(loadTasks, state => {
    return {
      ...state,
      loading: true,
      error: null
    }
  }),
  on(loadTasksSuccess, (state, {tasks}) => {
    return {
      ...state,
      tasks,
      loading: false
    }
  }),
  on(loadTasksFailure, state => {
    return {
      ...state,
      loading: false,
      error: null
    }
  }),
  on(loadTasksByCategoryIdRequest, state => {
    return {
      ...state,
      loading: true,
      error: null
    }
  }),
  on(loadTasksByCategoryIdSuccess, (state, {tasks}) => {
    return {
      ...state,
      tasks,
      loading: false
    }
  }),
  on(loadTasksByCategoryIdFailure, state => {
    return {
      ...state,
      loading: false,
      error: null
    }
  }),
  on(postTaskRequest, (state, {task}) => {
    return {
      ...state,
      loading: true,
      error: null
    }
  }),
  on(postTaskSuccess, state => {
    return {
      ...state,
      loading: false,
      error: null
    }
  }),
  on(postTaskFailure, state => {
    return {
      ...state,
      tasks: state.tasks,
      loading: false,
      error: null
    }
  }),
  on(deleteTaskRequest, state => {
    return {
      ...state,
      loading: true,
      error: null
    }
  }),
  on(completeTaskRequest, state => {
    return {
      ...state,
      loading: true,
      error: null
    }
  }),
);

export function taskReducer(state: any, action: any) {
  return _taskReducer(state, action);
}
