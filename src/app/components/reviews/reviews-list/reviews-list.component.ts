  import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

// Import Services
import { YelpService } from '@/services/yelp.service';
import { ReviewService } from '@/services/review.service';
import { UserService } from '@/services/user.service';

// Import Models
import { Review } from '@/models/review/review.model';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent implements OnInit {

  @Input('id') id: string;
  @Input('url') url: string;
  @Input('reviewType') reviewType: string;

  reviews: Review[] = [];
  formattedReviews: any = [];
  placeholderArray: number[]  = [0,1,2];
  p: number = 1;

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private yelpService: YelpService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.reviewType === "business") {
      this.getAllUserReviews()
      this.getYelpReviews();
    }
    else {
      this.getReviewsAttachedToUser();
    }

  }

  ngOnChanges() {
    // this.getAllUserReviews()
    console.log(this.formattedReviews);
  }

  // Something is happening here that adds a custom user review to the array twice

  getYelpReviews() {
    // Get Reviews form the Yelp API
    this.yelpService.getReviews(this.id, this.url).subscribe((result) => {
      this.reviews.push(...result['reviews']);
      console.log(this.reviews);
    });

  }

  addReview(newReview) {
    let { review } = newReview;
    review.user = JSON.parse(localStorage.getItem('currentUser'));
    this.reviews.unshift(review)

  }

  //Get user reviews attached to a business
  getAllUserReviews() {

    this.reviewService.getUserReviews(this.id)
    .subscribe( result => {

      console.log(result);

        if( Array.isArray(result)) {
          if(result.length > 0) {

            if(this.reviews) {
              //Add the user object to reviews
              this.getUserFromReview(result).then(this.addUsertoReview);
            }
          }

        }
        else {
          //display the reviews if no users are found
          this.formattedReviews = this.reviews
        }

    });
  }

  // NEed to tadd the user reviews to the reviews as above
  getReviewsAttachedToUser() {

    this.reviewService.getReviewsAttachedToUser(this.id)
    .subscribe(result => {

      if(this.reviews) {
        //Add the user object to reviews
        this.getUserFromReview(result).then(this.addUsertoReview);
      }
    })
  }

  // ADding the user object to the reviews returned from database
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
    const data = await this.userService.getUser(user_id).toPromise();
    return data;
  }

  // Sort the revuews, then add them to the list
   addUsertoReview = (result) => {
     this.reviews.push(...result);
     this.reviews.sort(this.sortReviewsByDate);
     this.reviews.reverse();
     this.formattedReviews = this.reviews
     console.log(this.formattedReviews);
  }

  sortReviewsByDate = (a,b) => {
    var c = new Date(a['time_created']);
    var d = new Date(b['time_created']);
    return c.getTime()-d.getTime();
  }

  pageChanged(event) {
    this.p = event;
  }
}
