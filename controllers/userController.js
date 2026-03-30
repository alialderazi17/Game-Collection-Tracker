const bcrypt = require('bcrypt')
const User = require('../models/User')

const signUp = async (req,res)=>{

  try{
    const userInDatabase = await User.findOne({
    email: req.body.email
    })
  if (userInDatabase){
    return res.send('User already Sign')
  }
if (req.body.password  !== req.body.confirmPassword){
return res.send('Passwords do not match')
}
const hashedPassword = await bcrypt.hash(
req.body.password,12)


req.body.password = hashedPassword

const newUser = await User.create(req.body)

req. session.user = {
  username:newUser.username,
  _id:newUser._id
}
res.send('User created')
  } catch ( error){
    console.log (error)
    res.send(' Error creating user')
  }

}


const signIn = async (req,res)=> {
  try{

    const userInDatabase= await User. findOne({
      email: req.body.email
})

if (!userInDatabase){

return res.send('User not found')
}

const validPassword = bcrypt.compareSync(

  req.body.password,
  userInDatabase
)

if (!validPassword){
return res.send('invalid password')
}

req.session.user = {
  username:userInDatabase.username,
  _id:userInDatabase._id
}

res.send('signed in')
  } catch (error){

console.log(error)
res.send('error signing in')

  }
}


const signOut = (req,res)=>{
  req.session.destroy()
  res.send('Signed out')

}

module.exports = {

  signUp, signIn , signOut
}
