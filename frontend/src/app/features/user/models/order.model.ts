import { Product } from "./product.model";

export interface Order {
  address: string;
  products: Product[];
}
