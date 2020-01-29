import { Component, OnInit, Input, ɵConsole } from '@angular/core';


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
  @Input('reviews') reviews: Review[] = [];

  // Outline of component


  constructor(
    private reviewService: ReviewService,
    private userService: UserService
  ) { }

  ngOnInit() {


  }

  ngOnChanges() {
    this.getAllUserReviews();
  }

  addReview(newReview) {
    let { review } = newReview;

    review.user = JSON.parse(localStorage.getItem('currentUser'));
    this.reviews.push(review)

  }

  // example from nate
  // async getCommunityName(communityID) {
  //   const data = await this.communitiesService.getCommunity(communityID).toPromise()
  //   return data.body
  // }

  // called wihin loop like

  // this.getCommunityName(job.CommunityID)
  //   .then((res: Community) => {

  getAllUserReviews() {
    console.log(this.reviews)
    this.reviewService.getUserReviews(this.id)
    .subscribe( result => {

        if( Array.isArray(result)) {
          if(result.length > 0) {

            // Need to create a user route to query user by the id in the review
            // Service
            // route in user-routes
            // User DB query to get the user , then return
            // Deal with the async functionality here

            let formattedReviews = result.map(review => {
              console.log(review)
              this.getReviewUser(review.user_id).then(res => {
                console.log(res);
                review.user = res;

                if(this.reviews) {
                  this.reviews.push(review)
                }
              })

              if( this.reviews ) {
                console.log(this.reviews)
              }
            })


          }
        }


    });
  }

  async getReviewUser(user_id) {
    const data = await this.userService.getuser(user_id).toPromise();
    return data;
  }




  add


}
