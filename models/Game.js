const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    cover: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Game", gameSchema)
