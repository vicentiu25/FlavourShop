import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  @Output() submitForm = new EventEmitter<User>()
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.setupForm();
  }

  get passwordFormControl(): AbstractControl {
    return this.registrationForm.get('password') as AbstractControl;
  }

  get confirmPasswordFormControl(): AbstractControl {
    return this.registrationForm.get('confirmationPassword') as AbstractControl;
  }

  onSubmit(formDirective: FormGroupDirective) {
    this.submitForm.emit(this.registrationForm.value as User)
    this.registrationForm.reset();
    formDirective.resetForm();
  }

  private setupForm(): FormGroup {
    const emailRegex = /^[a-zA-Z\d_.-]*@msg\.group$/
    const passwordRegex = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/
    return this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)]),
      password: new FormControl('', [Validators.required, Validators.pattern(passwordRegex)]),
      confirmationPassword: new FormControl('', [Validators.required, Validators.pattern(passwordRegex)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0][7][0-9]{8}$')]),
    })
  }
}
