import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YelpService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer 1TSelC6r6EeO4FBjtmYzL9SFeCrgZLSINT3Gxuhk4Ml5kLgtEJ-2FDsiBq6zmeNCdPYMvZjGjvSUiJvdQRs4b5xfdfq0XSiRHeI191na_bpNpvCHkIm3UZjuMhdWXXYx'
    })
  };

  constructor(
    private http: HttpClient,
  ) { }

  private handleError(error: any ='', context: any = '') {
    console.log(error);
    return throwError(error);
  }

  public getRestaurant() {
    let config = `/api`;

    console.log("this method called");
    return this.http.get(config, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
}
