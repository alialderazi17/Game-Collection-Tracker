const express = require("express")
const router = express.Router()

const reviewController= require("../controllers/reviewController")

router.post("/:gameId",reviewController.createReview)

router.delete("/:reviewId",reviewController.deleteReview)

module.exports=router
