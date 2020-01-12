import { User } from './review.model';

// Type created to match what the db needs to submit to create review
export interface UserReview {
  id: string;
  user_name: string;
  business_id: string;
  text: string;
  rating: string;
  user: User;
  time_created: string;
}

// TODO  User to be an object retured from our database
