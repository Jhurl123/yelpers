const rp = require('request-promise');
const $ = require('cheerio');

var exports = module.exports = {};

exports.scrapeReviews = function(req, res) {
  let url = req.body.url;
  console.log(url)
  rp(url).then(function(html) {

    //request
    let reviews = [];
    let reviewRating = [];
    const reviewElements = $('.lemon--div__373c0__1mboc .comment__373c0__3EKjH:not(.truncated__373c0__2tDRn) .lemon--span__373c0__3997G', html);
    const reviewRatingElements = $('li.lemon--li__373c0__1r9wz .arrange-unit-fill__373c0__17z0h > .lemon--div__373c0__1mboc.u-space-t1.u-space-b1 .lemon--span__373c0__3997G .i-stars__373c0__Y2F3O', html);
    const userNames = $('.arrange-unit-fill__373c0__17z0h .user-passport-info a[name]', html);

    console.log(userNames.length)
    console.log(reviewRatingElements.length)
    console.log(reviewElements.length)

    reviewElements.each(function(i, element){

      // console.log($(userNames[i]).text() + '  ' + i + '\n ' +$(this).text())
      // console.log($(userNames[i]).text())
      let review = {
        text: $(this).text(),
        review: extractRating(reviewRatingElements[i])
      }

      reviews.push(review);
    });

    res.json(reviews)
    // console.log(reviews)

  }).catch(function(err) {

    // Handle Error
    console.log(err)
  })

}

function extractRating(ratingObject) {
  let ariaLabel = $(ratingObject).attr('aria-label')

  if(ariaLabel) {
    return ariaLabel.substr(0,1);
  }
}
