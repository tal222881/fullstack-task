import { Injectable } from "@angular/core";
import { Product } from "../product/product.model";
@Injectable({
  providedIn: "root"
})
export class CartService {
  private products: Product[] = [];

  constructor() {}

  getCart(): Product[] {
    return this.products;
  }

  addToCart(p: Product) {
    //console.log("added to the cart");
    //I assume that if we have the same products in cart its ok , because its didn't mantion at the docs...
    this.products.push(p);
  }

  removeFromCart(sku: number) {
    this.products = this.products.filter(p => p.sku != sku);
  }
}
