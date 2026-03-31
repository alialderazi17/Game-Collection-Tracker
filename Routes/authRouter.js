const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

router.get("/sign-up", (req, res) => res.render("auth/sign-up"))
router.get("/sign-in", (req, res) => res.render("auth/sign-in"))

router.post("/sign-up", authController.registerUser)
router.post("/sign-in", authController.signInUser)
router.get("/sign-out", authController.signOutUser)

module.exports = router
