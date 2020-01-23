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

  constructor(
    private http: HttpClient,
  ) { }

  private handleError(error: any ='', context: any = '') {
    console.log(error);
    return throwError(error);
  }

  public getRestaurants(searchObject: any) {
    let config = `/api/yelp/search`;

    return this.http.post(config, searchObject, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getNearby(position) {
    let config = '/api/yelp/random-nearby';

    let searchObject = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }

    return this.http.post(config, searchObject, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getSingle(id) {
    let config = '/api/yelp/single';

    let idObject = {
      id: id
    }

    return this.http.post(config, idObject, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  // TODO fix this method to accept multiple strings ie. Categories
  public getSingleCategory(id) {
    let config = '/api/yelp/single';

    let idObject = {
      id: id
    }

    return this.http.post(config, idObject, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  public getReviews(id, url) {
    let config = '/api/yelp/scrape-reviews';

    let reviewObject = {
      id: id,
      url: url
    }

    return this.http.post(config, reviewObject, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

}
