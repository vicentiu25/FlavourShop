import { Injectable } from '@angular/core';
import { BackendService } from "../../../../core/backend/backend.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {
  codeURL = 'http://localhost:8080/verify?code='

  constructor(private service: BackendService) {
  }

  sendCode(code: string): Observable<any> {
    return this.service.get(this.codeURL + code);
  }
}
