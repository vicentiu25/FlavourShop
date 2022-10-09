import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { User } from "../../models/user.model";
import {ForgotPasswordService} from "../../services/forgotPassword/forgot-password.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() submitForm = new EventEmitter<User>()
  color: string = 'red';

  constructor(private forgotPasswordService: ForgotPasswordService, private _snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  onSubmit(formDirective: FormGroupDirective) {
    this.submitForm.emit(formDirective.value)
    this.loginForm.reset()
    formDirective.resetForm()
  }

  forgotPassword(){
    const username = this.loginForm.value.username as string
    this.forgotPasswordService.sendEmail(username).subscribe(() => {
      this._snackBar.open('Please check your email to reset your password', 'OK', {
        duration: 10000,
        panelClass: 'success-snackbar'
      });
    }, (e) => this._snackBar.open('User does not exist!', 'OK', {
      duration: 10000,
      panelClass: 'fail-snackbar'
    }));
    this.loginForm.reset()
  }
}
