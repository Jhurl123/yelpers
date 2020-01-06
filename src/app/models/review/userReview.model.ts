// Type created to match what the db needs to submit to create review
export interface UserReview {
  user_id: string;
  business_id: string;
  review_text: string;
  rating: string;
}
