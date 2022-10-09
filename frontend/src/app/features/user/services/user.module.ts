import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from "./user/user.service";
import { RegistrationFormComponent } from '../components/registration-form/registration-form.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { RegistrationContainerComponent } from '../containers/registration-container/registration-container.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ProductListComponent } from '../components/product-list/product-list.component';
import { MatCardModule } from "@angular/material/card";
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { LoginContainerComponent } from '../containers/login-container/login-container.component';
import { TokenInterceptor } from "./interceptor/token.interceptor";
import { EmailConfirmationComponent } from "../components/email-confirmation/emailconfirmation";
import { VerifyFailedComponent } from "../components/verify-failed/verify-failed.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { IngredientComponent } from "../components/ingredient/ingredient.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ShoppingCartService } from "../components/shopping-cart/shopping-cart.service";
import { ForgotPasswordComponent } from "../components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "../containers/reset-password/reset-password.component";
import { StarRatingComponent } from "../components/product-list/star-rating/star-rating.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { NumberDirective } from "../directives/numbers-only.directive";

@NgModule({
  declarations: [
    RegistrationFormComponent,
    RegistrationContainerComponent,
    ProductListComponent,
    LoginFormComponent,
    LoginContainerComponent,
    EmailConfirmationComponent,
    VerifyFailedComponent,
    IngredientComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    StarRatingComponent,
    NumberDirective
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    FormsModule,
    MatMenuModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,

  ],
    exports: [
        RegistrationFormComponent,
        ResetPasswordComponent,
        NumberDirective
    ],
  providers: [UserService, TokenInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, ShoppingCartService]
})

export class UserModule {
}
