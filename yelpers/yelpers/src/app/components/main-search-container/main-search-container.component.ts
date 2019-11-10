import { Component, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators, NgForm} from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private yelpService: YelpService,
    public dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      SearchTerms: ['', Validators.required],
      Location: ['', Validators.required],
    });

    // this.router.events.subscribe((event) => {
    //   if(event instanceof NavigationEnd) {
    //     this.searchForm.reset();
    //   }

    // });
  }

  toggleOpen() {

    this.isOpen = !this.isOpen;
  }

  onSubmit(form) {


    this.query = form.get('SearchTerms').value;
    this.location = form.get('Location').value;

    let searchObject = {
      SearchTerms: this.query,
      Location: this.location
    };



    this.yelpService.getRestaurant(searchObject).subscribe((result) => {

      console.log(result);

      this.result = result['businesses'];
      this.dataService.setBusinesses(result['businesses']);
      });
      this.router.navigate(['/search-results',{query:this.query,location:this.location}]);
  }

}
