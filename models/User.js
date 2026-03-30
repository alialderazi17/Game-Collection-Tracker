const { Timestamp } = require('bson')
const mongoose= require ('mongoose')

const userSchema = new mongoose.Schema({

  username:{type:String,required:true, unique:true},
email:{type:String, required:true, unique:true},
password:{type:String, required:true},
picture:{ type:String}
},{ Timestamp:true}
)

const User = MongoServerSelectionError.model("User",userSchema)

module.exports=User
