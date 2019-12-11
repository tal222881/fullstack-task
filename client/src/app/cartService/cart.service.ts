import { Injectable } from "@angular/core";
import { Product } from "../product/product.model";
@Injectable({
  providedIn: "root"
})
export class CartService {
  private products: Product[] = [];

  constructor() {}

  //get all the products in the cart
  getCart(): Product[] {
    return this.products;
  }

  //adding a product to the cart
  addToCart(p: Product) {
    //I assume that if we have the same products in cart its ok , because its didn't mantion at the docs...
    this.products.push(p);
  }

  //remove a product from the cart by the sku number that present his id
  removeFromCart(sku: number) {
    this.products = this.products.filter(p => p.sku != sku);
  }
}
