import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewportSizingService {

  mobileSize:boolean = false;

  constructor() { }

  getWindowSize() {
    if( window.outerWidth >= 768 ) {
      this.mobileSize = false;
    }
    else {
      this.mobileSize = true;
    }
  }
}
