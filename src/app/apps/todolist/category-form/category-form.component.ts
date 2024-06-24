import {Component } from '@angular/core';
import { MatDialogRef} from "@angular/material/dialog";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoryState } from '../../../store/state/category.state';
import { Store } from '@ngrx/store';
import { postCategoryRequest } from '../../../store/actions/category.actions';
import { CategoryModel } from '../../../store/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent {

  constructor(public dialogRef: MatDialogRef<CategoryFormComponent>, public fb: FormBuilder, private storeCategory: Store<CategoryState>) { }

  myGroup!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.myGroup = this.fb.group({
        name: ['', Validators.required],
    });
}

  submit() {

    if (!this.myGroup.value.name) {
      this.showMessage('Name is required.', 'error');
      return;
    }
    const category: CategoryModel = {id: '', name: this.myGroup.value.name } ;
    this.storeCategory.dispatch(postCategoryRequest({category}));

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
}
