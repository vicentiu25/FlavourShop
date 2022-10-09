import { Injectable } from '@angular/core';
import { BackendService } from "../../../../core/backend/backend.service";
import { User } from "../../models/user.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  registrationURL = 'http://localhost:8080/user';

  constructor(private service: BackendService) {
  }

  registration(user: User): Observable<void> {
    return this.service.post(this.registrationURL, user)
  }
}
