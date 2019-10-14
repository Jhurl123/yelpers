import { Component, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators, NgForm} from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
    private yelpService: YelpService
  ) { }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      SearchTerms: ['', Validators.required],
      Location: ['', Validators.required],
    });
  }

  toggleOpen() {

    this.isOpen = !this.isOpen;
  }

  onSubmit() {
    console.log(this.searchForm);
     this.yelpService.getRestaurant().subscribe((result) => {

      this.result = result;

      console.log(this.result);
     });
  }

}
