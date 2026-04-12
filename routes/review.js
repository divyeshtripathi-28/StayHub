const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const {isLoggedIn, isAuthor} = require("../middleware/middleware.js");
const {createReview,deleteReview} = require("../controllers/reviews.js");

const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

//Post Reviews
router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));

//Delete Review Route

router.delete("/:reviewId",isLoggedIn, isAuthor, wrapAsync(deleteReview));

module.exports = router;