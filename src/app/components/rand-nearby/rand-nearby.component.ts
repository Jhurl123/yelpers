import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { YelpService } from '@/services/yelp.service';

import { data as stockCities } from '@/store/stock-cities.store';

@Component({
  selector: 'app-rand-nearby',
  templateUrl: './rand-nearby.component.html',
  styleUrls: ['./rand-nearby.component.scss']
})
export class RandNearbyComponent implements OnInit {

  @Output() noLocation = new EventEmitter<boolean>();

  businesses: object[] = [];
  placeholders: boolean[]= [];
  position: any
  stockCities = stockCities;
  no_location: boolean = false;

  constructor(
    private yelpService: YelpService
  ) { }

  ngOnInit() {
    this.populatePlaceholders(3);
    this.position = navigator.geolocation.getCurrentPosition(this.success, this.error);
  }

  success = (pos) => {
    this.populatePlaceholders(9);
    this.yelpService.getNearby(pos).subscribe((result) => {
      this.businesses = result['businesses'].slice(0, 9);

    });

  }

  error = (error) => {
    if (error.code == error.PERMISSION_DENIED) {

      this.noLocation.emit(false);

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

  populatePlaceholders(numPlaceholders: number): void {
    for(let i =0; i < numPlaceholders; i++) {
      this.placeholders.push(false)
    }
  }
}
