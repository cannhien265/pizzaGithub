import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Topping } from '../models/topping.model';

@Injectable()
export class ToppingsService {
  constructor(private http: HttpClient) {}

  getToppings(): Observable<Topping[]> {
    return this.http
      .get<Topping[]>(`https://62ff454c34344b6431f5b034.mockapi.io/api/v1/toppings`)
      .pipe(catchError((error: any) => throwError(error.json)));
  }
}
