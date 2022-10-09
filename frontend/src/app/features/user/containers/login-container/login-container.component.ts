import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoginService } from "../../services/login/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  loginUser(user: User) {
    this.loginService.login(user).subscribe(result => {
      console.log(result);
      localStorage.setItem('token', JSON.stringify(result));
      this.loginService.loginState.next(true);
      this._snackBar.open("Hello! You were successfully logged in!", 'OK', {
        duration: 10000,
        panelClass: 'success-snackbar'
      })
      this.router.navigate(["/home"]);
    }, e => {
      this._snackBar.open(e.error.message, 'OK', {
        duration: 10000,
        panelClass: 'fail-snackbar'
      })
      console.log(e);
    })
  };
}


