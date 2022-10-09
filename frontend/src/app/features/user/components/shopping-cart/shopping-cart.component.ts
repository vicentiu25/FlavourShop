import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Product } from "../../models/product.model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Order } from "../../models/order.model";
import { OrderService } from "../../services/order/order.service";
import { ProductService } from "../../services/product/product.service";
import { ShoppingCartService } from "./shopping-cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnChanges {
  @Input() reset : boolean = false;
  @Output() submitForm = new EventEmitter<Order>()
  pattern = "[0-9]*"

  productsCart: Product[] = [];
  addressForm: FormGroup = new FormGroup({
    street: new FormControl('', [Validators.required, Validators.minLength(3)]),
    number: new FormControl('', [Validators.required, Validators.minLength(1)]),
    code: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
    county: new FormControl('', [Validators.required, Validators.minLength(3)]),
    town: new FormControl('', [Validators.required, Validators.minLength(3)]),
    country: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private orderService: OrderService, private shoppingCartService: ShoppingCartService) {

  }

  ngOnInit(): void {
    this.productsCart = JSON.parse(localStorage.getItem("products")!)
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.reset){
      this.deleteAllProducts();
    }
  }

  incrementQuantity(product: Product): void {
    const products = JSON.parse(localStorage.getItem("products")!)
    products.forEach((el : Product) => {
      if(product.idProduct === el.idProduct){
        el.quantityProduct++;
      }
    })
    localStorage.setItem("products", JSON.stringify(products))
    product.quantityProduct++;
    this.shoppingCartService.setCartItemsNumber();
  }

  decrementQuantity(product: Product): void {
    const products = JSON.parse(localStorage.getItem("products")!)
    products.forEach((el : Product) => {
      if(product.idProduct === el.idProduct){
        el.quantityProduct--;
      }
    })
    localStorage.setItem("products", JSON.stringify(products))
    product.quantityProduct--;
    this.shoppingCartService.setCartItemsNumber();

  }

  deleteProductFromCart(product: Product): void {
    const index: number = this.productsCart.indexOf(product);
    this.productsCart.splice(index, 1);
    const products = JSON.parse(localStorage.getItem("products")!)
    const indexP = products.indexOf(product)
    products.splice(indexP, 1)
    localStorage.setItem("products", JSON.stringify(products))

    this.shoppingCartService.setCartItemsNumber();
  }

  deleteAllProducts(): void {
    while(this.productsCart.length != 0){
      this.deleteProductFromCart(this.productsCart[0])
      this.productsCart = JSON.parse(localStorage.getItem("products")!)
    }
    this.reset = false;
  }

  getTotal(): number {
    let total = 0;

    for (let index in this.productsCart) {
      total += this.getPrice(this.productsCart[index]) * this.productsCart[index].quantityProduct;
    }
    return total;
  }

  getPrice(product: Product): number {
    let total = product.priceProduct;
    for (let index in product.ingredients) {
      total += product.ingredients[index].priceIngredient;
    }
    return total;
  }

  onSubmit(): void {
    const formData = this.addressForm.getRawValue()
    this.submitForm.emit({ products: this.productsCart, address: Object.values(formData).toString() })
  }

  itemsInCart(): number {
    let total: number = 0;
    for (let index in this.productsCart) {
      total += this.productsCart[index].quantityProduct;
    }
    return total;
  }
}
