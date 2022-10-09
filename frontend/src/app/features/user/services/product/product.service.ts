import { Injectable } from '@angular/core';
import { BackendService } from "../../../../core/backend/backend.service";
import { User } from "../../models/user.model";
import { Observable } from "rxjs";
import { Product } from "../../models/product.model";
import { error } from "@angular/compiler-cli/src/transformers/util";

import { Role } from "../../models/role.model";
import { Review } from "../../models/review.model";
import { Order } from "../../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];

  productsURL = 'http://localhost:8080/products/findall';
  roleURL = 'http://localhost:8080/user/role';

  constructor(private service: BackendService) {
  }

  oneProductURL = 'http://localhost:8080/products/';
  saveProductURL = 'http://localhost:8080/product/save';
  deleteProduct = 'http://localhost:8080/product/delete/';
  ratingURL = 'http://localhost:8080/review';


  getAllProducts(): Observable<Product[]> {
    return this.service.get(this.productsURL);
  }

  getProduct(productName: string | null): Observable<Product[]> {
    return this.service.get(this.oneProductURL + productName);
  }

  save(formData: FormData) {
    return this.service.post(this.saveProductURL, formData);
  }

  addToCart(product: Product) {
    this.products = JSON.parse(localStorage.getItem("products")!)
    const rezFind: undefined | Product = this.products.find(el => {
      let result
      if (!!el.ingredients) {
        result = el.ingredients.every(function (element) {
          if (!!product.ingredients) {
            let ingredientsNames = product.ingredients.map(el => el.nameIngredient);
            return ingredientsNames.includes(element.nameIngredient);
          }
          return false
        });
      } else {
        result = el.ingredients === product.ingredients
      }
      return product.idProduct === el.idProduct && result;
    });

    if (!!rezFind) {
      this.products.forEach((el) => {
        if (!!rezFind && el.idProduct === product.idProduct) {
          console.log(el.quantityProduct);
          console.log(product.quantityProduct);
          el.quantityProduct += product.quantityProduct;
          console.log(el.quantityProduct);
        }
      });
    } else {
      this.products.push(product);
    }
    localStorage.setItem("products", JSON.stringify([]))
    localStorage.setItem("products", JSON.stringify(this.products))
  }

  getRole(): Observable<Role> {
    console.log(this.service.get(this.roleURL))
    return this.service.get(this.roleURL);
  }

  delete(id: number) {
    return this.service.delete(this.deleteProduct + id);
  }

  addReview(review: Review): Observable<any> {
    console.log("ok1");
    return this.service.post(this.ratingURL, review)

  }




}
