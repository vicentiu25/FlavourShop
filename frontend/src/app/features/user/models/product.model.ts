import { Ingredient } from "./ingredient.model";

export type Product = {
  idProduct: number;
  priceProduct: number;
  nameProduct: string;
  stockProduct: string;
  description: string;
  imgProduct: string;
  ingredients: Ingredient[];
  quantityProduct: number;
  rating: number;
  noRatings :number;
}




