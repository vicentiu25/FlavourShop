import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { BackendService } from "../../../../core/backend/backend.service";
import { User } from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  homeURL = 'http://localhost:8080/user';

  constructor(private service: BackendService) {
  }

  home(user: User): Observable<void> {
    return this.service.post(this.homeURL, user)
  }
}
