import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DistanceService } from '@/services/distance.service';

import { Business } from '@/models/business/busines.model';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BusinessCardComponent implements OnInit {

  @Input() business: Business;

  constructor(
    private distanceService: DistanceService
  ) { }

  ngOnInit() {

    if(this.business) {
      this.business['miles'] = this.distanceService.convertMeterstoMiles(this.business['distance']);

      this.buildAddress();

      if(this.business['image_url'] == "" ) {
        this.business['image_url'] = "../../../assets/images/placeholder-image.jpg";
      }
    }

  }

  buildAddress() {
    let address: string[] = [];

    address.push(this.business['location'].address1);
    address.push(this.business['location'].address2);
    address.push(this.business['location'].city);

    address = address.filter(Boolean);
    this.business['address'] = address;

  }

}
