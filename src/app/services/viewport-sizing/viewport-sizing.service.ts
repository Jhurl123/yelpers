import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewportSizingService {
  constructor() { }

  getWindowSize() {

    let mobileSize:boolean = true;

    if( window.outerWidth >= 768 ) {
      mobileSize = false;
    }
    else {
      mobileSize = true;
    }

    return mobileSize;
  }

}
