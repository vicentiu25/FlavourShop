import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.scss']
})
export class RegistrationContainerComponent {

  constructor(private userService: UserService, private _snackBar: MatSnackBar, private router: Router) {
  }

  addUser(user: User) {
    this.userService.registration(user).subscribe(() => {
      this._snackBar.open('Successfull registration! Your account is created! Please check your email to verify your account!', 'OK', {
        duration: 10000,
        panelClass: 'success-snackbar'
      });
      setTimeout(() => this.router.navigate(["/login"]), 1000);
    }, (e) => this._snackBar.open(e.error.message, 'OK', {
      duration: 10000,
      panelClass: 'fail-snackbar'
    }))
  }
}
