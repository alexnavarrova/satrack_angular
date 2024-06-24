import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { TodoComponent } from './apps/todolist/todo/todo.component';

const routes: Routes = [

  { path: '',  canActivate: [AuthGuard], component: TodoComponent, title: 'Todo' },

  {
    path: 'apps',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: TodoComponent},
      {path: 'todolist', component: TodoComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
