import { Component, OnInit } from '@angular/core';
import { LoginService } from "../user/services/login/login.service";
import { Router } from "@angular/router";
import { map, Observable, startWith } from "rxjs";
import { FormControl } from "@angular/forms";
import { Product } from "../user/models/product.model";
import { ProductService } from "../user/services/product/product.service";
import { ShoppingCartService } from "../user/components/shopping-cart/shopping-cart.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logedin: boolean = false;
  myControl = new FormControl<string>('');
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  shoppingCartItemsNumber = 0;
  nameProduct: string = '';

  constructor(private shoppingCartService: ShoppingCartService, private productService: ProductService, private loginService: LoginService, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginService.currentLoginState.subscribe(result => this.logedin = result);
    this.productService.getAllProducts().subscribe((result: Product[]) => {

      this.options = result.map(product => {
        return product.nameProduct
      });

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = value;
          return name ? this._filter(name as string) : this.options.slice();
        }),
      );
    });
    this.shoppingCartService.setCartItemsNumber()
    this.shoppingCartService.cartItemsNumber$.subscribe(itemsNumber => {
      this.shoppingCartItemsNumber = itemsNumber;
    });
  }

  clickedFn(): void{
    let product = {idProduct:0, nameProduct: '', priceProduct: 0, stockProduct: '', quantityProduct: 0, imgProduct: '', ingredients: [], description:''}
    product.nameProduct= this.myControl.value!
    if(product.nameProduct.substring(0, 1) === " ")
      product.nameProduct = product.nameProduct.trimStart();
    else
      product.nameProduct.replace(' ', '-');

    this.myControl.setValue(' ');
    this.router.navigate(['/product'], {queryParams: {name: product.nameProduct}});
  }

  logout(): void {
    this.productService.products = [];
    localStorage.setItem("products", JSON.stringify([]))
    this.shoppingCartService.setCartItemsNumber()
    localStorage.removeItem('token');
    this.loginService.loginState.next(false);

    this.router.navigate(["/home"]);
  }

  displayFn(item: any): string {
    if (item == undefined) {
      return '';
    }
    return item;
  }

  _filter(myproduct: string): string[] {
    const filterValue = myproduct.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
