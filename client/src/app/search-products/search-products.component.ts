import { Component, OnInit, ElementRef, HostListener } from "@angular/core";
import { Product } from "../product/product.model";
import { ProductsService } from "../product/products.service";
import { CartService } from "../cartService/cart.service";
import { Subject } from "rxjs";

import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  share
} from "rxjs/operators";
@Component({
  selector: "app-search-products",
  templateUrl: "./search-products.component.html",
  styleUrls: ["./search-products.component.css"]
})
export class SearchProductsComponent implements OnInit {
  search: string = "";
  selectedOptionIndex: number = 0;
  openDropDown: boolean = false;
  products: Product[] = [];
  sendReq: any = null;
  visibleLoader: boolean = true;

  private charSubject = new Subject<string>();
  private dropdownSubject;
  productOb$ = null;

  constructor(
    public productsService: ProductsService,
    public cartService: CartService,
    private elRef: ElementRef
  ) {}

  ngOnInit() {
    this.productOb$ = this.charSubject.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(chars => this.productsService.getProductByChars(chars)),
      share() //make sure that my aren't multiple requst
    );
  }

  ngOnDestroy() {
    //unsubscribe to prevent memory leak
    this.dropdownSubject.unsubscribe();
  }

  //adding product to cart
  addToCart(p) {
    this.cartService.addToCart(p);
    this.openDropDown = false; //i assume that for UX the autocomplete dropdown will close
    this.search = ""; // another update that i think will be good for UX / UI is to clear the input search
  }

  //just for UX make sure we press the arrow up key prevent the cursor of the input from go to start
  preventCursorToStart(event) {
    if (event.keyCode == 38) event.preventDefault();
  }

  hanldeSearch(event) {
    /*
    # Search Request Handle
    */
    //if exists a search request lets clear it
    clearTimeout(this.sendReq);
    //init a send request
    //wait 800ms if the user stop typing=> then execute the search
    this.visibleLoader = true;
    this.sendReq = setTimeout(() => {
      this.products = [];
      this.visibleLoader = true;
      this.productOb$.subscribe(res => {
        this.selectedOptionIndex = 0;
        this.products = res;
        this.visibleLoader = false;
      });
      this.charSubject.next(event.target.value);
    }, 800);
    this.visibleLoader = this.products.length ? false : true;
    /*
    # Autocomplete Dropdown Visibility
    */
    //if we have some value show the dropdown and continue with the next subject change
    this.openDropDown = event.target.value.length ? true : false;
    this.keyControl(event); //call to hanlde the keys actions
  }

  keyControl(event) {
    /*
    # Toggling between autocomplete options
    */
    let dropDiv = this.elRef.nativeElement.querySelector(".drop"); //main autocomple dropdown
    switch (event.keyCode) {
      case 8: {
        //when we delete , reset the dropdown
        this.selectedOptionIndex = 0; // init the selected option from autocomplete
        if (dropDiv != null) dropDiv.scrollTop = 0; //make sure the the scroll is at the top
        break;
      }
      case 38: {
        // this is the ascii of arrow up
        clearTimeout(this.sendReq); //make sure we dont send any more request also by selecting
        //chaging each key press the location of selected
        this.selectedOptionIndex =
          this.selectedOptionIndex <= 0 ? 0 : this.selectedOptionIndex - 1;
        //the prev option that needs to be shown in the dropdown view
        let resDiv = this.elRef.nativeElement.querySelector(
          ".res:nth-child(" + (this.selectedOptionIndex + 1) + ")"
        );
        //lets make sure when moving options we can see it with changing inner scroll
        if (resDiv != null && resDiv.offsetTop < dropDiv.scrollTop) {
          dropDiv.scrollTop -= resDiv.offsetHeight;
        }

        break;
      }
      case 40: {
        // this is the ascii of arrow down
        clearTimeout(this.sendReq); //make sure we dont send any more request also by selecting
        //chaging each key press the location of selected
        this.selectedOptionIndex =
          this.selectedOptionIndex >= this.products.length - 1
            ? this.products.length - 1
            : this.selectedOptionIndex + 1;

        //the next option that needs to be shown in the dropdown view
        let resDiv = this.elRef.nativeElement.querySelector(
          ".res:nth-child(" + (this.selectedOptionIndex + 1) + ")"
        );
        //lets make sure when moving options we can see it with changing inner scroll
        if (
          resDiv != null &&
          resDiv.offsetTop + resDiv.offsetHeight > dropDiv.offsetHeight
        ) {
          dropDiv.scrollTop += resDiv.offsetHeight;
        }
        break;
      }
      case 13: {
        //when press enter we need to add the product to the cart
        clearTimeout(this.sendReq); //make sure we dont send any more request also by selecting
        this.addToCart(this.products[this.selectedOptionIndex]); //add the product obj to cart  as param that selected by the "selectedOptionIndex"
        this.products = []; // reset for next time results dropdown
        break;
      }
    }
  }

  @HostListener("scroll", ["$event"])
  onElementScroll(event) {
    //we neeed to detect when we scroll up ... or down - for get more options to the dropdown
    //lets check we make a request only when we at the bottom of the autocomple div
    if (
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight
    ) {
      if (this.products.length)
        this.dropdownSubject = this.productsService
          .getMoreDropDownOption()
          .subscribe(res => {
            this.products = res;
          });
    }
  }
}
