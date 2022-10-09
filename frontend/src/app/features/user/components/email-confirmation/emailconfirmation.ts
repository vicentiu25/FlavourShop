import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmailVerificationService} from "../../services/email-verification/email-verification.service";

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  showSuccess: boolean = false;
  showError: boolean = false;
  code: string = "NOT GOOD ";

  constructor(private _route: ActivatedRoute, private emailVerificationService: EmailVerificationService, private router: Router) {
  }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail = () => {
    this.showError = this.showSuccess = false;
    const code = this._route.snapshot.queryParams['code'];
    this.code = code;
    this.emailVerificationService.sendCode(code).subscribe(res => {
      console.log(res);
      console.log(res.confirmed)
      if (res.confirmed) {
        this.router.navigate(["/login"])
      } else this.router.navigate(["/verify-failed"])
    });
  }
}
