import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
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

  businesses: [];

  constructor(
    private http: HttpClient,
  ) { }

  private handleError(error: any ='', context: any = '') {
    console.log(error);
    return throwError(error);
  }

  public getRestaurant(searchObject: any) {
    let config = `/api/search`;

    console.log(searchObject);
    return this.http.post(config, searchObject, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getNearby(position) {
    let config = '/api/random-nearby'

    let searchObject = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }

    console.log(searchObject);
    return this.http.post(config, searchObject, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

}
