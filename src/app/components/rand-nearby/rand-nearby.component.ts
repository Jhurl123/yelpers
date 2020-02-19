import { Component, OnInit } from '@angular/core';
import { YelpService } from '@/services/yelp.service';

import { data as stockCities } from '@/store/stock-cities.store';

@Component({
  selector: 'app-rand-nearby',
  templateUrl: './rand-nearby.component.html',
  styleUrls: ['./rand-nearby.component.scss']
})
export class RandNearbyComponent implements OnInit {

  businesses: object[] = [];
  placeholders: boolean[]= [];
  position: any
  stockCities = stockCities;
  no_location: boolean = false;

  constructor(
    private yelpService: YelpService
  ) { }

  ngOnInit() {
    for(let i =0; i < 12; i++) {
      this.placeholders.push(false)
    }
    // TODO If geolocator isn't enabled, select random businesses
    this.position = navigator.geolocation.getCurrentPosition(this.success, this.error);
  }

  success = (pos) => {
    this.yelpService.getNearby(pos).subscribe((result) => {
      this.businesses = result['businesses'].slice(0, 9);

    });

  }

  error(error) {
    if (error.code == error.PERMISSION_DENIED) {
      this.no_location = true;
      this.stockCities.forEach( element => {
        console.log(element);
        let searchObject = {
          Location: element.city
        }
          this.yelpService.getRestaurantsFromList(searchObject).subscribe(result => {
            this.businesses.push(result['businesses'][0]);
          })
      })
    }
  }

}
