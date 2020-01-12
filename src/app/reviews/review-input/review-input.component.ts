import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';

import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-input',
  templateUrl: './review-input.component.html',
  styleUrls: ['./review-input.component.scss']
})
export class ReviewInputComponent implements OnInit {

  reviewForm: FormGroup;
  reviewRating: number;
  submitSuccess: boolean = false;
  alertText: string;
  alertType: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewService
  ) { }

  ngOnInit() {

    this.reviewForm = this.formBuilder.group({
      reviewText: ['',Validators.required],
      reviewRating: ['', Validators.required]
    })
  }

  onRate(event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    this.reviewRating = event.newValue;
  }

  // formControlNAme cannpt be used on a component, so I will read the value of it
  // as a prop on the component and set its value dynamically in this file
  onSubmit() {

    this.reviewForm.controls['reviewRating'].setValue(this.reviewRating)
    console.log(this.reviewForm.value);
    this.reviewService.postReview(this.reviewForm.value)
    .subscribe(result => {
      console.log(result)
    })

  }

}
