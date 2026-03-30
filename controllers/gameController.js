const Game = require("../models/Game")
const createGame = async (req, res) => {
try {
  req.body.author = req.session.user._id
  const newGame = await Game.create(req.body)
res.send(newGame)
} catch (error) {
    console.log(error)
    res.send("Error creating game")}}

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find()
    res.send(games)
  } catch (error) {
    console.log(error)
    res.send("Error getting games")
  }
}


const getSingleGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
    res.send(game)
  } catch (error) {
    console.log(error)
    res.send("Error getting game")
  }
}
const updateGame = async (req, res) => {
  try {
    const updatedGame =
      await Game.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true })
  res.send(updatedGame)
  } catch (error) {
  console.log(error)
  res.send("Error updating game")
}}

const deleteGame = async (req, res) => {
  try {
  await Game.findByIdAndDelete(
  req.params.id
    )
    res.send("Game deleted")
  } catch (error) {
    console.log(error)
    res.send("Error deleting game")
  }}

module.exports = {
createGame,getAllGames,getSingleGame,updateGame,deleteGame }
