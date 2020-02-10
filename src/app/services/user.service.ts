import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/models/user/user';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  private handleError(error: any ='', context: any = '') {
    return throwError(error);
  }

  registerUser(userForm: User) {
    let config = "/api/user/signup";

    return this.http.post(config, userForm)
    .pipe(
      catchError(this.handleError)
    )

  }

  getUser(user_id: string) {
    let config = 'api/user/getUser';

    return this.http.post(config, {user_id})
    .pipe(
      catchError(this.handleError)
    )
  }

  editUser(userObject) {
    let config = 'api/user/editUser';

    return this.http.patch(config, userObject)
    .pipe(
      catchError(this.handleError)
    )
  }

  getNumReviews(userID: string) {
    let config = 'api/user/getNumReviews';

    return this.http.post(config, {userID})
    .pipe(
      catchError(this.handleError)
    )
  }


}

