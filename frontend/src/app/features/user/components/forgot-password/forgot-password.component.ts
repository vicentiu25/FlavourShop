import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user.model";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ResetPasswordComponent} from "../../containers/reset-password/reset-password.component";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  userId: number = 0;
  @Output() resetForm = new EventEmitter<User>()

  constructor(private activatedRoute:ActivatedRoute, private router: Router) { }

  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]),
    confirmationPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]),
  })

  matchPasswordValidator(password: string, passwordConfirmation: string) {
    return passwordConfirmation === password;
  }

  onSubmit(formDirective: FormGroupDirective) {
    let user = formDirective.value as User
    this.resetForm.emit(user);
  }

  ngOnInit(): void {
  }

}
