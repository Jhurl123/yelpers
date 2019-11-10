import { Injectable } from '@angular/core';
import {Observable,of, from, BehaviorSubject } from 'rxjs';
import {Subject} from "rxjs/Subject";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private businessSource: BehaviorSubject<{}> = new BehaviorSubject({});
  businesses = this.businessSource.asObservable();

  constructor(){

  }

  setBusinesses(val: {}){
    console.log(val);
    this.businessSource.next(val);
  }

  getBusinesses(){
    console.log(this.businesses)
    return this.businesses;
  }
}
