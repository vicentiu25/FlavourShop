import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BackendService} from "../../../../core/backend/backend.service";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  URL = 'http://localhost:8080/reset?username=';
  resetURL = 'http://localhost:8080/reset?code=';

  constructor(private service: BackendService) { }

  sendEmail(username: string): Observable<any> {
    return this.service.get(this.URL + username);
  }

  sendPassword(user: User, code: string): Observable<any> {
    return this.service.post(this.resetURL + code, user);
  }

}
