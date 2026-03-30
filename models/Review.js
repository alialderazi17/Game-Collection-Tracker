const { Timestamp } = require("bson")
const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
body:{type:String, required:true},
rating:{ type: Number,required:true},
user:{type:mongoose.Schema.Types.ObjectId,
 ref:"User",
 required:true},

 game:{ type: mongoose.Schema.Types.ObjectId,
  ref:"Game",
  required:true},


},
{Timestamp:true}
)
