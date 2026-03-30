const { Timestamp } = require('bson')
const mongoose = require('mongoose')
const gameSchema=new mongoose.Schema({

title:{ type:String,required:true},
genre:{type: String, required:true},
releaseYear:{type:Number, required: true},
cover:{type:String},
author:{ type: mongoose.Schema.Types.ObjectId,
ref:"User",  required: true},
reviews:{type: mongoose.Schema.Types.ObjectId,
  ref: 'Review'
},
Timestamp:true
})


const Game = mongoose.model("Game",gameSchema)

module.exports= Game
