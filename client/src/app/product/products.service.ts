import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Product } from "./product.model";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class ProductsService {
  // API path
  base_path = "http://localhost:4000/api/products";

  //searchResults:;
  constructor(private http: HttpClient) {}

  getProductByChars(chars: string): Observable<Product[]> {
    return chars.length
      ? this.http
          .get<Product[]>(this.base_path + "/match/" + chars)
          .pipe(catchError(err => this.handleError(err)))
      : new Observable<Product[]>();
  }

  getMoreDropDownOption(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.base_path + "/more_option")
      .pipe(catchError(err => this.handleError(err)));
  }

  // Error handling
  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
