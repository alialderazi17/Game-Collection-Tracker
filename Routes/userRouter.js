const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const { isSignedIn } = require("../middleware")

router.get("/profile", isSignedIn, userController.getUserProfile)

module.exports = router
