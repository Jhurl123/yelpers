import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { YelpService } from '@/services/yelp.service';
import { DataService } from '@/services/data/data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  location: string;
  query: string;

  businesses: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private yelpService: YelpService,
    public dataService: DataService
    ) { }

  ngOnInit() {

    this.getRestaurants();
  }

  getRestaurants() {

    let searchObject = this.dataService.getBusinesses();


    console.log(this.query, this.location);

    this.dataService.businesses.subscribe((result: any[]) => {
      this.query = this.route.snapshot.params['query'];
      this.location = this.route.snapshot.params['location'];
      if(result.length > 0) {
        this.businesses = result;
      }
    });

  }

}
