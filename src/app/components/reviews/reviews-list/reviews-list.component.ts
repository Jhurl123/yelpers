import { Component, OnInit, Input } from '@angular/core';

// Import Services
import { YelpService } from '@/services/yelp.service';

// Import Models
import { Review } from '@/models/review/review.model';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent implements OnInit {

  @Input('id') id: string;
  @Input('reviews') reviews: Review[];

  // Outline of component


  constructor( private yelpService: YelpService) { }

  ngOnInit() {
  }

  addReview(newReview) {
    let { review } = newReview
    review.user = JSON.parse(localStorage.getItem('currentUser'));
    this.reviews.push(review)
  }
}
