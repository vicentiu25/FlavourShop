import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationContainerComponent } from "../containers/registration-container/registration-container.component";
import { ProductListComponent } from "../components/product-list/product-list.component";
import { LoginContainerComponent } from "../containers/login-container/login-container.component";
import { HomeComponent } from "../components/home/home.component";
import { VerifyFailedComponent } from "../components/verify-failed/verify-failed.component";
import { EmailConfirmationComponent } from "../components/email-confirmation/emailconfirmation";
import { ShoppingCartComponent } from "../components/shopping-cart/shopping-cart.component";
import { IngredientComponent } from "../components/ingredient/ingredient.component";
import {ProductSearchedComponent} from "../components/product-searched/product-searched.component";
import { OrderComponent } from "../components/order/order.component";
import {ForgotPasswordComponent} from "../components/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "../containers/reset-password/reset-password.component";
import { OrderContainerComponent } from "../containers/order-container/order-container.component";
import { VerifyFailedPassComponent } from "../components/verify-failed-pass/verify-failed-pass.component";

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationContainerComponent,
    pathMatch: 'full'
  }, {
    path: 'products',
    component: ProductListComponent,
    pathMatch: 'full'
  }, {
    path: 'product',
    component: ProductSearchedComponent,
    pathMatch: 'full'
  }, {
    path: 'login',
    component: LoginContainerComponent,
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  }, {
    path: 'verify-failed',
    component: VerifyFailedComponent,
    pathMatch: 'full'
  }, {
    path: 'email-confirmation',
    component: EmailConfirmationComponent,
    pathMatch: 'full'
  }, {
    path: 'shopping-cart',
    component: OrderContainerComponent,
    pathMatch: 'full'
  }, {
    path: 'ingredient',
    component: IngredientComponent,
    pathMatch: 'full'
  },{
    path: 'order',
    component: OrderComponent,
    pathMatch: 'full'
  },{
    path: 'reset',
    component: ResetPasswordComponent,
    pathMatch: 'full'
  },{
    path: 'verify-failed-pass',
    component: VerifyFailedPassComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {
}
