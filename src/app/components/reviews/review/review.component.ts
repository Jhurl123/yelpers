import { Component, OnInit, Input } from '@angular/core';
import { Review } from '@/models/review/review.model';
import { UserReview } from '@/models/review/userReview.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input('review') review: Review | UserReview;
  constructor() { }

  ngOnInit() {

    console.log(this.review)
  }

}
