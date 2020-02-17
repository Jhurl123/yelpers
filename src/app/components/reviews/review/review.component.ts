import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input('review') review;
  constructor() { }

  ngOnInit() {

    let isReview = this.isReviewType(this.review);
    if( !isReview ) {

      this.formatReviewUser();
    }

  }

  isReviewType(review): boolean {
    return 'id' in review;
  }

  formatReviewUser() {
    let { user } = this.review;
    if ( user.first_name && user.last_name ) {
      this.review.user.name = user.first_name + ' ' + user.last_name.slice(0,1) + '.';
    }

  }

  addCurrentTime() {
    let time = new Date();
    this.review.time_created = time;
  }
}
