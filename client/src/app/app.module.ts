import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { SearchProductsComponent } from "./search-products/search-products.component";
import { LeftSideComponent } from "./left-side/left-side.component";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { CartCompComponent } from './cart-comp/cart-comp.component';
@NgModule({
  declarations: [AppComponent, SearchProductsComponent, LeftSideComponent, CartCompComponent],
  imports: [BrowserModule, MatIconModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
