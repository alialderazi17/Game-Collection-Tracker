const express = require("express")
const router = express.Router()

const gameController = require("../controllers/gameController")

router.get("/", gameController.showAllGames)

router.post("/", gameController.addNewGame)
router.get("/new", gameController.addGamePage)
router.get("/:id", gameController.showGamePage)
router.delete("/:id", gameController.deleteGame)
module.exports = router
