import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { YelpService } from '@/services/yelp.service';


@Component({
  selector: 'app-single-business',
  templateUrl: './single-business.component.html',
  styleUrls: ['./single-business.component.scss']
})
export class SingleBusinessComponent implements OnInit {

  business: {};
  reviews: {};

  constructor(
    private yelpService: YelpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {


    this.route.paramMap.subscribe((params: ParamMap) => {
      this.setBusiness(params.get("id"));
    });

  }

  setBusiness(id) {

    this.yelpService.getSingle(id).subscribe(result => {
      console.log(result);
      this.business = result;
    })
    console.log(id);

    this.yelpService.getReviews(id).subscribe(result => {
      console.log(result);
      this.reviews = result;
    })

  }
}
