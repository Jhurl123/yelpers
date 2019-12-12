import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  // Params: Distance in meters (float)
  convertMeterstoMiles(meters) {
    let miles = meters * .0006213712;
    let formattedValue = miles.toFixed(1);

    return formattedValue;
  }
}
