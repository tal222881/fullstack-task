import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Product } from "../product/product.model";
import { ProductsService } from "../product/products.service";
import { CartService } from "../cartService/cart.service";
import { Subject } from "rxjs";
import { searchQueryOp } from "../product/searchQueryOp";

@Component({
  selector: "app-search-products",
  templateUrl: "./search-products.component.html",
  styleUrls: ["./search-products.component.css"]
})
export class SearchProductsComponent implements OnInit {
  //req: any = null;
  arrowkeyLocation: number = 0;
  isDrop: boolean = false;
  products: Product[] = [];

  private charSubject = new Subject<string>();

  productOb$ = this.charSubject.pipe(
    searchQueryOp(chars => this.productsService.getProductByChars(chars))
  );

  constructor(
    public productsService: ProductsService,
    public cartService: CartService,
    private elRef: ElementRef
  ) {}

  ngOnInit() {}

  addToCart(index, p) {
    //console.log(p);
    this.cartService.addToCart(p);
    this.arrowkeyLocation = index;
    this.isDrop = false;
  }

  searchPosts(event) {
    //each time we search we need to reset our selected value

    this.productOb$.subscribe(res => {
      this.products = res;
    });
    if (event.target.value.length) {
      this.isDrop = true;
      this.charSubject.next(event.target.value);
    } else {
      this.isDrop = false;
      this.productOb$ = this.charSubject.pipe(
        searchQueryOp(chars => this.productsService.getProductByChars(chars))
      );
    }
  }

  keysControl(event) {
    //for geting the height of the div that was hidden

    let dropDiv = this.elRef.nativeElement.querySelector(".drop");
    switch (event.keyCode) {
      case 8: {
        //when we delete reset the dropdown
        this.searchPosts(event);
        this.arrowkeyLocation = 0;
        dropDiv.scrollTop = 0;
        break;
      }
      case 38: {
        // this is the ascii of arrow up

        //chaging each key press the location of selected
        this.arrowkeyLocation =
          this.arrowkeyLocation <= 0 ? 0 : this.arrowkeyLocation - 1;

        event.preventDefault(); //make sure the cursor no go to start of input
        let resDiv = this.elRef.nativeElement.querySelector(
          ".res:nth-child(" + (this.arrowkeyLocation + 1) + ")"
        );

        //lets make sure when moving options we can see it with changing inner scroll drop
        if (resDiv.offsetTop < dropDiv.scrollTop) {
          dropDiv.scrollTop -= resDiv.offsetHeight;
        }
        break;
      }
      case 40: {
        // this is the ascii of arrow down

        //chaging each key press the location of selected

        this.arrowkeyLocation =
          this.arrowkeyLocation >= this.products.length - 1
            ? this.products.length - 1
            : this.arrowkeyLocation + 1;

        //lets make sure when moving options we can see it with changing inner scroll drop
        let resDiv = this.elRef.nativeElement.querySelector(
          ".res:nth-child(" + (this.arrowkeyLocation + 1) + ")"
        );

        //only when is in the view of the drop div
        if (resDiv.offsetTop + resDiv.offsetHeight > dropDiv.offsetHeight) {
          dropDiv.scrollTop += resDiv.offsetHeight;
        }
        break;
      }
      case 13: {
        //when press enter

        this.cartService.addToCart(this.products[this.arrowkeyLocation]);
        this.isDrop = false;
        break;
      }
    }
  }
}
