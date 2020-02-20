import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { UserReview } from '../models/review/user-review.model';

import { User } from '../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  httpOptions: any;
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.authenticationService.currentUser.subscribe(result => {
      this.currentUser = result;
    });
  }

  private handleError(error: any ='', context: any = '') {
    return throwError(error);
  }

  // Hit the route to insert review to database
  public postReview(review: UserReview) {
    let config = '/api/reviews/create';

    console.log(review);
    console.log(this.currentUser);
    if (this.currentUser && this.currentUser.token) {
      return this.http.post(config, review)
      .pipe(
        catchError(this.handleError)
      );
    } else {
      return of();
    }
  }

  // Get the reviews attached to a business
  public getUserReviews(business_id: string) {
    let config = '/api/reviews/getAll';

    console.log(config)

    return this.http.post(config, {business_id})
    .pipe(
      catchError(this.handleError)
    );
  }

  public getReviewsAttachedToUser(user_id: string) {
    let config = '/api/reviews/getByUser';

    console.log(config)

    return this.http.post(config, {user_id})
    .pipe(
      catchError(this.handleError)
    );
  }

}
