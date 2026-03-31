const express = require("express")
const router = express.Router()

const reviewController = require("../controllers/reviewController")
const middleware = require("../middleware")

router.post("/", middleware.isSignedIn, reviewController.createReview)
router.get("/", reviewController.getAllReviews)
router.get("/:id", middleware.isSignedIn, reviewController.getReviewById)
router.put("/:id", middleware.isSignedIn, reviewController.updateReviewById)

module.exports = router
