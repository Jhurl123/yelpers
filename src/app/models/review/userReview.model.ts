// Type created to match what the db needs to submit to create review
export interface UserReview {
  id: string;
  user_name: string;
  business_id: string;
  text: string;
  rating: string;
}
