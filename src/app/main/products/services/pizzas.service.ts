import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Pizza} from "../models/pizza.model";

@Injectable()
export class PizzasService {
  constructor(private http: HttpClient) {
  }
  getPizzas(): Observable<Pizza[]> {
    return this.http
      .get<Pizza[]>(`https://62ff454c34344b6431f5b034.mockapi.io/api/v1/pizza`)
      .pipe(catchError((error: any) => throwError(error.json)));
  }
  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(`https://62ff454c34344b6431f5b034.mockapi.io/api/v1/pizza`, payload)
      .pipe(catchError((error: any) => throwError(error.json)));
  }
  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .put<Pizza>(`https://62ff454c34344b6431f5b034.mockapi.io/api/v1/pizza/${payload.id}`, payload)
      .pipe(catchError((error: any) => throwError(error.json)));
  }
  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<any>(`https://62ff454c34344b6431f5b034.mockapi.io/api/v1/pizza/${payload.id}`)
      .pipe(catchError((error: any) => throwError(error.json)));
  }
}
