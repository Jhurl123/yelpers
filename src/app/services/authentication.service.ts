import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/models/user/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;

    @Output() isLoggedIn = new EventEmitter<boolean>();
    public loggedIn: boolean = false;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        if(this.currentUserValue) {
          this.loggedIn = true;
        }
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(emailAddress, password) {

      let config = '/api/account/login';

      return this.http.post<any>(config, { emailAddress, password })
          .pipe(map(user => {

            if(typeof user.response != 'undefined') {
              return user
            }
            else {
              this.loggedIn = true;
              console.log(user);
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
              }
          }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.isLoggedIn.emit(false);
        this.loggedIn = false;
        this.currentUserSubject.next(null);
    }
}
