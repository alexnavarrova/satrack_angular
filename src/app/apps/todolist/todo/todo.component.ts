import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskState } from '../../../store/state/task-user.state';
import { loadTasks } from '../../../store/actions/task.actions';
import { loadCategories } from '../../../store/actions/category.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})

export class TodoComponent {
  isShowTaskMenu = false;
  constructor(private store: Store<{ taskState: TaskState }>) {}

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.store.dispatch(loadCategories());
  }

  onSetIsShowTaskMenu() {
    this.isShowTaskMenu = !this.isShowTaskMenu;
  }
}
