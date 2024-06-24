import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../../../store/models/task.model';
import { TaskState } from '../../../store/state/task-user.state';
import { Store } from '@ngrx/store';
import { selectAllTasks } from '../../../store/selectors/task.selectors';
import { completeTaskRequest, deleteTaskRequest } from '../../../store/actions/task.actions';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {

  tasks$: Observable<TaskModel[]> = new Observable<TaskModel[]>();

  constructor(private store: Store<TaskState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  async taskComplete(task: TaskModel)  {

    this.store.dispatch(completeTaskRequest({task: {...task, isCompleted: !task.isCompleted}}));

  }


  viewTask(task: TaskModel){
    console.log(task);
  }

  editTask(task: TaskModel){

    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {task},
    });

    dialogRef.afterClosed().subscribe((result: TaskModel) => {
      dialogRef.close();
    });

  }

  async deleteTask(task: TaskModel){
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to proceed with this action?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      this.store.dispatch(deleteTaskRequest({task: {...task }}));
    }
  }


}
