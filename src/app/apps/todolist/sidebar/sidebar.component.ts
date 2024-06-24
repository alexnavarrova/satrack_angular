import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CategoryModel } from '../../../store/models/category.model';
import { selectAllCategories, selectCategoryError, selectCategoryLoading } from '../../../store/selectors/category.selectors';
import { TaskState } from '../../../store/state/task-user.state';
import { loadTasksByCategoryIdRequest } from '../../../store/actions/task.actions';
import { CategoryState } from '../../../store/state/category.state';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { TaskModel } from '../../../store/models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private categoryStore: Store<CategoryState>, private taskStore: Store<TaskState>, public fb: FormBuilder, public dialog: MatDialog ) {}


  @Output()
  public onSetIsShowLoading: EventEmitter<boolean> = new EventEmitter();

  selectedTab = '';

  params!: FormGroup;

  categories$: Observable<CategoryModel[]> = new Observable<CategoryModel[]>();
  loading$: Observable<boolean> = new Observable<false>();
  error$!: Observable<any>;


  ngOnInit(): void {
    this.categories$ = this.categoryStore.select(selectAllCategories);

    this.loading$ = this.categoryStore.select(selectCategoryLoading);

    this.error$ = this.categoryStore.select(selectCategoryError);

  }

  tabChanged(categoryId: string) {
    this.selectedTab = categoryId;

    this.taskStore.dispatch(loadTasksByCategoryIdRequest({ categoryId }));

    this.onSetIsShowLoading.emit();
  }


  addEditTask() {
    this.onSetIsShowLoading.emit();
    const dialogRef = this.dialog.open(TaskFormComponent);

    dialogRef.afterClosed().subscribe((result: TaskModel) => {
      dialogRef.close();
    });

  }

  addCategory() {
    this.onSetIsShowLoading.emit(false);

    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: TaskModel) => {
      dialogRef.close();
    });

  }
}
