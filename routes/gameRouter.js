const express = require("express")
const router = express.Router()

const gameController = require("../controllers/gameController")
const middleware = require("../middleware")

router.get("/", gameController.showAllGames)

router.post("/", middleware.isSignedIn, gameController.addNewGame)
router.get("/new", middleware.isSignedIn, gameController.addGamePage)
router.get("/:id", gameController.showGamePage)
router.delete("/:id", middleware.isSignedIn, gameController.deleteGame)
module.exports = router
