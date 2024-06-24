import { TaskModel } from '../models/task.model';

export interface TaskState {
  tasks: TaskModel[];
  loading: boolean;
  error: any;
}

export const initialTaskState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};
