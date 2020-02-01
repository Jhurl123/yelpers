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


}

