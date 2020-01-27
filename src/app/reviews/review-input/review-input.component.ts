import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ReviewService } from '../../services/review.service';
import { AuthenticationService } from '../../services/authentication.service';

import { User } from '@/models/user/user';
import { UserReview } from '@/models/review/user-review.model';

@Component({
  selector: 'app-review-input',
  templateUrl: './review-input.component.html',
  styleUrls: ['./review-input.component.scss']
})
export class ReviewInputComponent implements OnInit {

  @Output() newReview = new EventEmitter<{review: UserReview}>();

  reviewForm: FormGroup;
  reviewRating: string;
  userReview: UserReview;
  businessId: string
  submitFailure: boolean = true;
  alertText: string;
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.currentUser = this.authService.currentUserValue;

    this.reviewForm = this.formBuilder.group({
      reviewText: ['', Validators.required]
    });

    this.setReturnUrl();

  }

  setReturnUrl() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.businessId = params.get("id");
    });
  }

  onRate(event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    this.reviewRating = event.newValue.toString();
  }

  setAlert(is_failure: boolean, alertText: string = '') {
    this.alertText = alertText;
    this.submitFailure = is_failure;
  }

  onSubmit() {

    if(!this.reviewRating) {
      this.setAlert(false, "Please Give a Rating");
      return;
    }

    if(this.reviewForm.get('reviewText').errors) {
      this.setAlert(false, "Please enter some text for your review")
      return;
    }

    this.userReview = new UserReview({
      business_id: this.businessId,
      text: this.reviewForm.get('reviewText').value.trim(),
      rating: this.reviewRating,
      user: JSON.parse(localStorage.getItem('currentUser'))
    })

    this.reviewService.postReview(this.userReview)
    .subscribe(result => {
      this.setAlert(true,'');
      console.log("This is a success")
      this.addReview(result);

    })

  }

  addReview(review) {
    console.log(review)
    this.newReview.emit({
      review: review
    });
  }

}
