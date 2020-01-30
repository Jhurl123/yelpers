import { Component, OnInit, Input, ɵConsole } from '@angular/core';


// Import Services
import { YelpService } from '@/services/yelp.service';
import { ReviewService } from '@/services/review.service';
import { UserService } from '@/services/user.service';

// Import Models
import { Review } from '@/models/review/review.model';
import { UserReview } from '@/models/review/user-review.model';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent implements OnInit {

  @Input('id') id: string;
  @Input('url') url: string;

  reviews: Review[] = [];

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private yelpService: YelpService
  ) { }

  ngOnInit() {
    this.getReviews();
  }

  ngOnChanges() {
    this.getAllUserReviews();
  }

  getReviews() {
    // Get Reviews
    this.yelpService.getReviews(this.id, this.url).subscribe((result) => {
      this.reviews.push(...result['reviews']);
    });
  }

  addReview(newReview) {
    let { review } = newReview;
    review.user = JSON.parse(localStorage.getItem('currentUser'));
    this.reviews.push(review)

  }

  getAllUserReviews() {
    this.reviewService.getUserReviews(this.id)
    .subscribe( result => {

        if( Array.isArray(result)) {
          if(result.length > 0) {
            this.getUserFromReview(result)
            if(this.reviews) {
              this.getUserFromReview(result).then(this.addUsertoReview);
            }
          }

        }

    });
  }

  async getUserFromReview(result)   {
    let formattedReviews = result.map(review => {
      return this.getReviewUser(review.user_id).then(res => {
        review.user = res;
        return review
      })
    })

    return Promise.all(formattedReviews);
  }

  async getReviewUser(user_id) {
    const data = await this.userService.getuser(user_id).toPromise();
    return data;
  }

  // Sort the revuews, then add them to the list
   addUsertoReview = (result) => {
     this.reviews.push(...result);
     this.reviews.sort(this.sortReviewsByDate);
     this.reviews.reverse();
  }

  sortReviewsByDate = (a,b) => {
    var c = new Date(a['time_created']);
    var d = new Date(b['time_created']);
    return c.getTime()-d.getTime();
  }

}
