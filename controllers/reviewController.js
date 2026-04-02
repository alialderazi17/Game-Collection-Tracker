const Review = require("../models/Review")
const Game = require("../models/Game")
const User = require("../models/User")
const createReview = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.user.username })

    await Review.create({
      body: req.body.body,
      rating: req.body.rating,
      user: user._id,
      game: req.body.game,
    })
    res.redirect("/reviews")
  } catch (error) {
    console.error("⚠️ An error has occurred creating a review!", error.message)
  }
}

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate("game").populate("user")
    res.render("./reviews/index.ejs", { reviews })
  } catch (error) {
    console.error(
      "⚠️ An error has occurred getting all reviews!",
      error.message
    )
  }
}

const showNewReviewPage = async (req, res) => {
  try {
    const games = await Game.find({})
    res.render("./reviews/new.ejs", { games: games })
  } catch (error) {
    res.status(404).json({
      message: "⚠️ Error showing New Review Page!",
      error: error.message,
    })
  }
}

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("game")
      .populate("user")
    res.render("./reviews/show.ejs", { review: review })
  } catch (error) {
    console.error("⚠️ An error has occurred getting a review!", error.message)
  }
}

const getGamesForReview = async (req, res) => {
  try {
    const games = await Game.find({})

    res.render("reviews/new", { games: games })
  } catch (error) {
    res.redirect("/reviews")
  }
}

const showEditReviewPage = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
    res.render("./reviews/edit.ejs", { review: review })
  } catch (error) {
    console.error(
      "⚠️ An error has occurred showing the edit review page!",
      error.message
    )
  }
}

const updateReviewById = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    })
      .populate("game")
      .populate("user")
    res.redirect(`/reviews/${review._id}`)
  } catch (error) {
    console.error("⚠️ An error has occurred deleting a review!", error.message)
  }
}

const deleteReviewById = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id)
    res.render("./reviews/confirm.ejs")
  } catch (error) {
    console.error("⚠️ An error has occurred deleting a review!", error.message)
  }
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  getGamesForReview,
  showEditReviewPage,
  showNewReviewPage,
  updateReviewById,
  deleteReviewById,
}
