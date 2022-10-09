import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import {Product} from "../../models/product.model";

@Injectable()
export class ShoppingCartService {
  private _cartItemsNumber = new BehaviorSubject<number>(0)
  cartItemsNumber$ = this._cartItemsNumber.asObservable();

  get cartItemsNumber(): number {
    return this._cartItemsNumber.getValue();
  }

  setCartItemsNumber() {
    this._cartItemsNumber.next(JSON.parse(localStorage.getItem("products")!).reduce((total : number, product : Product) => {
      return total+product.quantityProduct;
    }, 0));
  }
}
