const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
    body: { type: String, required: true },
    rating: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Review", reviewSchema)
