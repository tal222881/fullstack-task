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
    this.getCartProducts();
  }

  getCartProducts() {
    this.cart = this.cartService.getCart();
  }

  removeProductFromCart(p) {
    this.cartService.removeFromCart(p.sku);
    this.getCartProducts();
  }
}
