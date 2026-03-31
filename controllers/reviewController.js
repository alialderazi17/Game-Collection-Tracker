const Review = require("../models/Review")

const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body)
    res.redirect(`/reviews/${review._id}`)
  } catch (error) {
    console.error("⚠️ An error has occurred creating a review!", error.message)
  }
}

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
    res.render("./reviews/all.ejs", { reviews })
  } catch (error) {
    console.error(
      "⚠️ An error has occurred getting all reviews!",
      error.message
    )
  }
}

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
    res.render("./reviews/show.ejs", { review })
  } catch (error) {
    console.error("⚠️ An error has occurred getting a review!", error.message)
  }
}

const updateReviewById = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    })
    res.redirect(`/reviews/${review._id}`)
  } catch (error) {
    console.error("⚠️ An error has occurred deleting a review!", error.message)
  }
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
}
