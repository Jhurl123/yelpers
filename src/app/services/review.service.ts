import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { UserReview } from '../models/review/user-review.model';

import { User } from '../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  httpOptions: any;
  currentUser: User

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
   this.currentUser = this.authenticationService.currentUserValue;
  }

  private handleError(error: any ='', context: any = '') {
    return throwError(error);
  }

  // What reveiw service needs to do
  // Post reviews = Need to pass the JWT along with the request so that it can be validated by the server
  // Error handling
  // Query reviews from the database - Yelp service gets the yelp reviews
  public postReview(review: UserReview) {
    let config = '/api/reviews/create';

    if (this.currentUser && this.currentUser.token) {
      return this.http.post(config, review)
      .pipe(
        catchError(this.handleError)
      );
    } else {
      return of();
    }
  }

}
