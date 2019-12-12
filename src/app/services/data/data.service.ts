import { Injectable } from '@angular/core';
import {Observable,of, from, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private businessSource: BehaviorSubject<{}> = new BehaviorSubject({});
  businesses = this.businessSource.asObservable();

  constructor(){}

  setBusinesses(val: any[], searchObject: {}){

    if( val.length !== 0 ) {
      this.businessSource.next(val);
    }
    else {
      this.businessSource.next(null);
    }
  }

  getBusinesses(){
    return this.businessSource;
  }

  clearBusinesses() {
    localStorage.removeItem('searchObject');
    this.businessSource.next({});
  }
}
