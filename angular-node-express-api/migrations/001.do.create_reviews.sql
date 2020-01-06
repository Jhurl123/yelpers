CREATE TABLE reviews (
    user_id INT NOT NULL PRIMARY KEY,
    business_id VARCHAR(100)NOT NULL PRIMARY KEY,
    review_text VARCHAR(2500),
    rating DECIMAL(5,2)
    created_date timestamp
);
