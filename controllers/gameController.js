const Game = require("../models/Game")

const showAllGames = async (req, res) => {
  try {
    const games = await Game.find({})

    res.render("./games/index.ejs", { games: games })
  } catch (error) {
    res
      .status(500)
      .json({ message: "⚠️ Error getting all games!", error: error.message })
  }
}

const addNewGame = async (req, res) => {
  try {
    await Game.create({
      title: req.body.title,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      cover: req.body.cover,
    })
    res.redirect("/games")
  } catch (error) {
    res
      .status(500)
      .json({ message: "⚠️ Error adding game!", error: error.message })
  }
}

const showGamePage = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
    res.render("./games/show.ejs", { game: game })
  } catch (error) {
    res.status(404).json({
      message: "⚠️ Error showing Game Page!",
      error: error.message,
    })
  }
}

const addGamePage = async (req, res) => {
  try {
    res.render("./games/new.ejs")
  } catch (error) {
    res.status(404).json({
      message: "⚠️ Error showing Add Game Page!",
      error: error.message,
    })
  }
}

const deleteGame = async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id)
    res.redirect("/games")
  } catch (error) {
    res
      .status(500)
      .json({ message: "⚠️ Error deleting game!", error: error.message })
  }
}

module.exports = {
  showAllGames,
  addNewGame,
  showGamePage,
  addGamePage,
  deleteGame,
}
