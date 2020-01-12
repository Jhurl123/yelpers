import { Component, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators, NgForm} from '@angular/forms';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';

import { DataService } from '@/services/data/data.service';
import { YelpService } from '@/services/yelp.service';

@Component({
  selector: 'app-main-search-container',
  templateUrl: './main-search-container.component.html',
  styleUrls: ['./main-search-container.component.scss']
})
export class MainSearchContainerComponent implements OnInit {

  searchForm: FormGroup;
  isOpen: boolean = true;
  result: any;
  response = {};
  query: string;
  location: string;
  validationError: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private yelpService: YelpService,
    public dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      SearchTerms: ['', Validators.required],
      Location: ['', Validators.required],
    });

    this.route.queryParams.subscribe(param => {


      if( Object.entries(param).length > 0 ) {

        if(param.query && param.location) {
          let searchObject = {
            SearchTerms: param.query,
            Location: param.location
          }

          this.getBusinesses(searchObject);
        }
      }
    });

  }

  toggleOpen() {

    this.isOpen = !this.isOpen;
  }

  onSubmit(form) {


    this.query = form.get('SearchTerms').value.replace(/<[^>]+>/g, '');
    this.location = form.get('Location').value.replace(/<[^>]+>/g, '');

    let query = this.query.trim(),
        location = this.location;


    if( !form.valid) {
      if( !query ) {
        this.validationError = "Please Enter an item to search!";
      }
      else if ( !location ) {
        this.validationError = "Please enter a location!";
      }
    }
    else {
      this.validationError = "";

      let searchObject = {
        SearchTerms: query.trim(),
        Location: location.trim()
      };

      this.getBusinesses(searchObject);
      this.router.navigate(['/search-results'], { queryParams: {query: query, location: location}});
    }
  }

  getBusinesses(searchObject) {

    this.yelpService.getRestaurants(searchObject).subscribe((result) => {


      this.result = result['businesses'];

      this.dataService.setBusinesses(result['businesses'], searchObject);
    });

  }
}
