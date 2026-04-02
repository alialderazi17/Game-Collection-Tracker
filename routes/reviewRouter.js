const express = require("express")
const router = express.Router()

const reviewController = require("../controllers/reviewController")
const middleware = require("../middleware")

router.post("/", middleware.isSignedIn, reviewController.createReview)
router.get("/", reviewController.getAllReviews)

router.get("/new", middleware.isSignedIn, reviewController.showNewReviewPage)
router.get("/new", middleware.isSignedIn, reviewController.getGamesForReview)
router.get("/:id", middleware.isSignedIn, reviewController.getReviewById)
router.get(
  "/:id/edit",
  middleware.isSignedIn,
  reviewController.showEditReviewPage
)
router.put("/:id", middleware.isSignedIn, reviewController.updateReviewById)

router.delete("/:id", middleware.isSignedIn, reviewController.deleteReviewById)
module.exports = router
