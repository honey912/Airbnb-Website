const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createdReview=async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }
  
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.review.push(newReview);
  
    await newReview.save();
    await listing.save();
    console.log("Review saved");
    req.flash("success","Review is saved!");
    res.redirect(`/listings/${listing._id}`);
  }

  module.exports.destroyReview=async (req, res) => {
    const { id, reviewId } = req.params;
  
    const listing = await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }
  
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," review Deleted!");
    res.redirect(`/listings/${id}`);
  }