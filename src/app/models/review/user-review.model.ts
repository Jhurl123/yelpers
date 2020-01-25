import { User } from './review.model';

// Type created to match what the db needs to submit to create review
export class UserReview {

  constructor(
    event: {
      business_id: string,
      text: string,
      rating: string,
      user: User
    }
  ) {
    return ({
      business_id: event.business_id,
      text: event.text,
      rating: event.rating,
      user: event.user
    })
  }

}

// TODO  User to be an object retured from our database
