const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    rating: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Review", reviewSchema)
