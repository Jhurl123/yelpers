import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


import { YelpService } from '@/services/yelp.service';

import { Business } from '@/models/business/busines.model';
import { Review } from '@/models/review/review.model';


@Component({
  selector: 'app-single-business',
  templateUrl: './single-business.component.html',
  styleUrls: ['./single-business.component.scss']
})
export class SingleBusinessComponent implements OnInit {

  business: Business;
  reviews: Review[];
  imgArray: string[];

  @ViewChild('slideshow', {static: false}) slideshow: any;

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

    this.yelpService.getSingle(id).subscribe((result: Business) => {
      console.log(result);
      this.imgArray = result.photos;
      this.business = result;
    });

    this.yelpService.getReviews(id).subscribe((result: Review[]) => {
      console.log(result);
      this.reviews = result;
    });

  }

}
