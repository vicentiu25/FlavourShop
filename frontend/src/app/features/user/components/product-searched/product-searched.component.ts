import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Ingredient} from "../../models/ingredient.model";
import {IngredientService} from "../../services/ingredient/ingredient.service";
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";

@Component({
  selector: 'app-product-searched',
  templateUrl: './product-searched.component.html',
  styleUrls: ['./product-searched.component.scss']
})
export class ProductSearchedComponent implements OnInit {
  selectedProductIngredients: Array<any[]> = [];
  quantities: Array<number> = [];
  pattern = "[0-9]*"
  private nameProduct: string = '';
  products: Product[] = [{idProduct:0, nameProduct: '', priceProduct: 0, stockProduct: '', quantityProduct: 1, imgProduct: '', ingredients: [], description:'', rating: 0, noRatings: 0}];
  ingredients: Ingredient[] = [];

  constructor(private shoppingCartService: ShoppingCartService, private productService: ProductService, private activatedRoute:ActivatedRoute, private router: Router, private _snackBar: MatSnackBar, private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.nameProduct = params['name'].replace('-', ' ');

      if (this.nameProduct == '') {
        this.router.navigate(["/products"]);
      } else {
        this.productService.getProduct(this.nameProduct).subscribe(result => {
          this.products = result.map(product => {
            return {...product, quantityProduct: 1}
          });
          this.router.navigate(['/product'], {queryParams: {name: this.nameProduct.replace(' ', '-')}});
          this.resetQuantities();
        }), () => {
            this._snackBar.open('Failed to search for this product!', 'OK', {
            duration: 3000,
            panelClass: 'fail-snackbar'
            })
            this.router.navigate(['/home']);
        }
      }
    });

    this.ingredientService.getAllIngredients().subscribe((result: Ingredient[]) => {
      this.ingredients = result.map(ingredient => {
        return {...ingredient}
      });
    })
  }

  addProduct(product: Product, index: number): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(["/login"]);
    } else {
      const productCopy = {...product};
      productCopy.quantityProduct = +this.quantities[index];
      productCopy.ingredients = this.selectedProductIngredients[index];
      this.productService.addToCart(productCopy);
      this.shoppingCartService.setCartItemsNumber();
      this.resetQuantities();
      this.resetIngredients();
    }
  }

  resetIngredients() {
    this.selectedProductIngredients = [];
    this.selectedProductIngredients.map(() =>  this.selectedProductIngredients.push([]))
  }

  resetQuantities() {
    this.quantities = []
    this.products.map(() =>  this.quantities.push(1))
  }

}
