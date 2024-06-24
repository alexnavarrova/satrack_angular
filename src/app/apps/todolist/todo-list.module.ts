import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { TodoComponent } from './todo/todo.component';
import { IconModule } from '../../shared/icon/icon-module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ComponentModule } from '../../shared/components/component-module';
import {MatDialogModule} from "@angular/material/dialog";
import { QuillModule } from 'ngx-quill';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({

  declarations: [
    SidebarComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskFormComponent,
    TaskHeaderComponent,
    TodoComponent,
    CategoryFormComponent,
    SafeHtmlPipe,
  ],
  imports: [
    MatDialogModule,
    CommonModule,
    IconModule,
    ComponentModule,
    NgScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    MatDatepickerModule
  ],
  exports: [
    TodoComponent
  ]
})
export class TodoListModule { }
