import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signInRequest } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-boxed-signin',
  templateUrl: './boxed-signin.component.html',
  animations: [
    trigger('toggleAnimation', [
        transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
        transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
  ],
})

export class BoxedSigninComponent {

  loginForm: FormGroup;
  error: string = '';
  hide = true;


  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    const credentials = {email: this.loginForm.value.email, password: this.loginForm.value.password};

    this.store.dispatch(signInRequest({credentials}));
  }

}
