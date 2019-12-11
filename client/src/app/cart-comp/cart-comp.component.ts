import { Component, OnInit } from "@angular/core";
import { Product } from "../product/product.model";
import { CartService } from "../cartService/cart.service";

@Component({
  selector: "app-cart-comp",
  templateUrl: "./cart-comp.component.html",
  styleUrls: ["./cart-comp.component.css"]
})
export class CartCompComponent implements OnInit {
  private cart: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.initCartProducts();
  }

  //init the cart products
  initCartProducts() {
    this.cart = this.cartService.getCart();
  }

  //remove product from the cart
  removeProductFromCart(p) {
    this.cartService.removeFromCart(p.sku);
    this.initCartProducts();
  }
}
