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
    config = {
      'apiUrl' : 'http://localhost:4000'
    }


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
      this.loggedIn = true;
      let config = '/api/login';

      console.log(emailAddress)

      return this.http.post<any>(config, { emailAddress, password })
          .pipe(map(user => {
              this.loggedIn = true;
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
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
