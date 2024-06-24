
import {Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';

import { CategoryState } from '../../../store/state/category.state';
import { CategoryModel } from '../../../store/models/category.model';
import { postTaskRequest, putTaskRequest } from '../../../store/actions/task.actions';
import { TaskCreateModel } from '../../../store/models/task.create.model';
import { selectAllCategories } from '../../../store/selectors/category.selectors';
import { TaskState } from '../../../store/state/task-user.state';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {

  constructor(public dialogRef: MatDialogRef<TaskFormComponent>, public fb: FormBuilder, private categoryStore: Store<CategoryState>,
    private taskStorage: Store<TaskState>, @Inject(MAT_DIALOG_DATA) public modalData: any) { }

  @Input() data: any;

  myGroup!: FormGroup;

  categories$: Observable<CategoryModel[]> = new Observable<CategoryModel[]>();

  editorOptions = {
    toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline', 'link'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
  };

  ngOnInit(): void {
    this.categories$ = this.categoryStore.select(selectAllCategories);

    this.initForm();
  }

  initForm() {


    try{
      const {task} = this.modalData
      this.data = task;

      this.myGroup = this.fb.group({
        categoryId: [this.data.categoryId, Validators.required],
        title: [this.data.title, Validators.required],
        description: [this.data.description, Validators.required],
        dueDate: [this.data.dueDate, Validators.required],
      });
    } catch {
      this.myGroup = this.fb.group({
        categoryId: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        dueDate: ['', Validators.required],
      });
    }
}

  submit() {

    if (!this.myGroup.value.title) {
      this.showMessage('Title is required.', 'error');
      return;
    }

    if (!this.myGroup.value.categoryId) {
      this.showMessage('Category is required.', 'error');
      return;
    }

    if (!this.myGroup.value.description) {
      this.showMessage('Description is required.', 'error');
      return;
    }
    if (!this.myGroup.value.dueDate) {
      this.showMessage('Due Date is required.', 'error');
      return;
    }

    const task: TaskCreateModel = {
      id: this.data?.id,
      title: this.myGroup.value.title,
      description: this.myGroup.value.description,
      categoryId: this.myGroup.value.categoryId,
      dueDate: new Date(this.myGroup.value.dueDate) ,
    } ;


    if (this.data?.id) {
      this.taskStorage.dispatch(putTaskRequest({task}));
    } else {
      this.taskStorage.dispatch(postTaskRequest({task}));
    }

    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  showMessage(msg = '', type = 'success') {
    const toast: any = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        customClass: { container: 'toast' },
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
  }

  setDiscriptionText(event: any) {
    //this.myGroup.patchValue({ description: event.text });
  }
}
