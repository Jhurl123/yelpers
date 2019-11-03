import { Component, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators, NgForm} from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private yelpService: YelpService,
    private router: Router
  ) { }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      SearchTerms: ['', Validators.required],
      Location: ['', Validators.required],
    });

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.searchForm.reset();
      }

    });
  }

  toggleOpen() {

    this.isOpen = !this.isOpen;
  }

  onSubmit() {

    console.log(this.searchForm);
     this.yelpService.getRestaurant(this.searchForm.value).subscribe((result) => {

      this.result = result;

      this.response = result;

     });
  }

}
