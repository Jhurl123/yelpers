import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';

import { YelpService } from '@/services/yelp.service';
import { DataService } from '@/services/data/data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  p:number = 1;
  location: string;
  query: string;
  noResults: boolean = false;
  showSpinner: boolean = false;
  businesses: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private yelpService: YelpService,
    public dataService: DataService
    ) { }

  ngOnInit() {

    this.getRestaurants();

    this.route.queryParams.subscribe(param => {
      if(param) {

        let searchObject = {
          SearchTerms: param.query,
          Location: param.location
        }

        this.query = searchObject.SearchTerms;
        this.location = searchObject.Location;

      }
    });
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        this.businesses = [];
        // this.getRestaurants();
        this.dataService.clearBusinesses();
      }

    });
  }

  getRestaurants() {

    this.dataService.businesses.subscribe((result: any[]) => {

      this.showSpinner = true;
      if( result === null ) {
        console.log("this is null");
        this.noResults = true;
        this.showSpinner = false;
      }

      else if(result.length > 0) {
        this.businesses = result;
        this.showSpinner = false;
      }

    });

  }

  pageChanged(event) {
    console.log(event)
    console.log(this.p)
    this.p = event;
  }

}
