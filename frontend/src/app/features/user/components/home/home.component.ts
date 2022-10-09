import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login/login.service";
import { UserService } from "../../services/user/user.service";
import { Router } from "@angular/router";
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  logedin: boolean = false;
  user: string = "";

  constructor(private loginService: LoginService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginService.currentLoginState.subscribe(result => this.logedin = result);

    if (localStorage.getItem('token') !== null) {
      const token = jwt_decode(localStorage.getItem('token')!);
      // @ts-ignore
      this.user = token.sub;
    }
  }
}
