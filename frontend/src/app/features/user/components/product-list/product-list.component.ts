import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from "../../services/product/product.service";
import { Product } from "../../models/product.model";
import { Ingredient } from "../../models/ingredient.model";
import { IngredientService } from "../../services/ingredient/ingredient.service";
import { PageEvent } from "@angular/material/paginator";
import { ShoppingCartService } from "../shopping-cart/shopping-cart.service";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { forkJoin } from "rxjs";
import { Review } from "../../models/review.model";
import { PopUpComponent } from "./pop-up/pop-up.component";
import { LoginService } from "../../services/login/login.service";
import { StarRatingComponent } from "./star-rating/star-rating.component";


export interface DialogData {
  idProduct: number;
  rating: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Output() submitReview = new EventEmitter<number>();
  rating: Array<number> = [];
  ingredients: Ingredient[] = [];
  logedin: boolean = false;
  private ratingArr = [];
  pattern = "[0-9]*"
  products: Product[] = [];

  selectedProductIngredients: Array<any[]> = [];

  pageSlice: Product[] = this.products.slice(0, 4);

  role: string = '';

  isNumber: boolean = true;

  quantities: Array<number> = [];

  constructor(private shoppingCartService: ShoppingCartService, private productService: ProductService, private ingredientService: IngredientService, private router: Router, private dialog: MatDialog, private loginService: LoginService) {
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((result: Product[]) => {

        this.products = result.map(product => {
          return { ...product, quantityProduct: 1 }
        });

    })
  }


  ngOnInit(): void {
    this.loginService.currentLoginState.subscribe(result => this.logedin = result);
    forkJoin(this.productService.getAllProducts(), this.ingredientService.getAllIngredients()).subscribe(data => {
      const [products, ingredients] = data;
      this.products = products.map(product => {
        return { ...product, quantityProduct: 1 }
      });
      this.ingredients = ingredients.map(ingredient => {
        return { ...ingredient }
      });
      this.pageSlice = this.products.slice(0, 4);
      this.resetQuantities();
      this.resetIngredients();
      this.products.map(() => this.rating.push(0))
    })


    this.productService.getRole().subscribe(result => {
      this.role = result.name;
    })
  }

  addProduct(product: Product, index: number): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(["/login"]);
    } else {
      const productCopy = { ...product };
      productCopy.quantityProduct = +this.quantities[index];
      productCopy.ingredients = this.selectedProductIngredients[index];
      this.productService.addToCart(productCopy);
      this.shoppingCartService.setCartItemsNumber();
      this.resetQuantities();
      this.resetIngredients();
    }
  }

  sortProduct(type: string, by: string) {
    if (by == "price")
      if (type == "asc") {
        this.products.sort((a, b) => a.priceProduct - b.priceProduct);
      } else
        this.products.sort((a, b) => b.priceProduct - a.priceProduct);
    else if (type == "asc")
      this.products.sort((a, b) => a.nameProduct.localeCompare(b.nameProduct));
    else
      this.products.sort((a, b) => b.nameProduct.localeCompare(a.nameProduct));
    this.pageSlice = this.products.slice(0, 4);
  }


  onPageChange(event: PageEvent) {
    const start = event.pageIndex * event.pageSize;
    let end = start + event.pageSize;
    if (end > this.products.length) {
      end = this.products.length;
    }
    this.pageSlice = this.products.slice(start, end);
  }

  resetIngredients() {
    this.selectedProductIngredients = [];
    this.selectedProductIngredients.map(() => this.selectedProductIngredients.push([]))
  }

  resetQuantities() {
    this.quantities = []
    this.products.map(() => this.quantities.push(1))
    console.log(this.quantities)
  }

  onDeleteProduct(id: number) {
    this.productService.delete(id).subscribe(result => {
        console.log(result),
          this.getAllProducts();
        window.location.reload();
      },
      error => console.log(error))
  }

  openDialog() {
    this.dialog.open(PopUpComponent);
  }

  openDialogReview(idProduct: number): void {
    let dialogRef = this.dialog.open(StarRatingComponent, {
      width: '250px',
      data: { idProduct: idProduct, rating: 0 },
    });
   dialogRef.afterClosed().subscribe(result => this.getAllProducts())
  }

}
