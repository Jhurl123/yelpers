import { Component, OnInit, Input } from '@angular/core';
import { Review } from '@/models/review/review.model';
import { UserReview } from '@/models/review/user-review.model';

import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input('review') review: Review | UserReview;
  constructor(
    private reviewService: ReviewService
  ) { }

  ngOnInit() {

  }

}
