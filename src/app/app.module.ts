import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { IconModule } from "./shared/icon/icon-module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { authReducer } from './store/reducers/auth.reducer';
import { SnackbarService } from './utils/snackbar.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TaskEffects } from './store/effects/task.effects';
import { LoadingService } from './utils/loading.service';
import { HttpHelperService } from './utils/http-helper.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { taskReducer } from './store/reducers/task.reducer';
import { categoryReducer } from './store/reducers/category.reducer';
import { CategoryEffects } from './store/effects/category.effects';
import { TodoListModule } from './apps/todolist/todo-list.module';

@NgModule({
    declarations: [
        AppComponent,
        LoadingSpinnerComponent,
    ],
    providers: [
      SnackbarService,
      provideAnimationsAsync(),
      LoadingService,
      HttpHelperService,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      provideHttpClient(withFetch())
    ],
    bootstrap: [AppComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      IconModule,
      TodoListModule,
      AuthModule,
      QuillModule,
      StoreModule.forRoot({
        auth: authReducer,
        taskState: taskReducer,
        categoryState: categoryReducer,
      }),
      EffectsModule.forRoot([ AuthEffects, TaskEffects, CategoryEffects ]),
      StoreDevtoolsModule.instrument({maxAge: 25}),
    ]
})
export class AppModule { }
