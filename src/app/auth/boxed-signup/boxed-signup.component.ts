import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {signUpRequest} from "../../store/actions/auth.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-boxed-signup',
  templateUrl: './boxed-signup.component.html'
})
export class BoxedSignupComponent implements OnInit {

  registerForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private store: Store) {
    this.registerForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  onRegister() {
    const credentials = {
      name: this.registerForm.value.name,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    };

    this.store.dispatch(signUpRequest({credentials}));
  }

  passwordMatchValidator(form: FormGroup): any {
    return form.controls['password'].value === form.controls['confirmPassword'].value
      ? null : {mismatch: true};
  }
}
