import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DistanceService } from '@/services/distance.service';


@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BusinessCardComponent implements OnInit {

  @Input() business: object;

  constructor(
    private distanceService: DistanceService
  ) { }

  ngOnInit() {

    this.business['miles'] = this.distanceService.convertMeterstoMiles(this.business['distance']);

    this.buildAddress();
    this.buildCategory();

  }

  buildAddress() {
    let address: string[] = [];

    address.push(this.business['location'].address1);
    address.push(this.business['location'].address2);
    address.push(this.business['location'].city);

    address = address.filter(Boolean);
    this.business['address'] = address;

  }

  buildCategory() {
    let categories: string[] =[];



  }

}
