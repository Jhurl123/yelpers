import { Component, OnInit } from '@angular/core';
import { YelpService } from '@/services/yelp.service';

@Component({
  selector: 'app-rand-nearby',
  templateUrl: './rand-nearby.component.html',
  styleUrls: ['./rand-nearby.component.scss']
})
export class RandNearbyComponent implements OnInit {

  businesses: object[]
  position: any

  constructor(
    private yelpService: YelpService
  ) { }

  ngOnInit() {
    // TODO If geolocator isn't enabled, select random businesses?
    this.position = navigator.geolocation.getCurrentPosition(this.success, this.error);
  }

  success = (pos) => {
    this.yelpService.getNearby(pos).subscribe((result) => {
      this.businesses = result['businesses'].slice(0, 9);

    });
  }

  error(error) {

  }

}
