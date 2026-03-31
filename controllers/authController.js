const bcrypt = require("bcrypt")
const User = require("../models/User")

const registerUser = async (req, res) => {
  try {
    const emailExists = await User.exists({ email: req.body.email })
    if (emailExists) {
      return res.send("Email already taken!")
    }

    if (req.body.password !== req.body.confirmPassword)
      return res.send("Passwords must match!")

    const hashedPassword = await bcrypt.hash(req.body.password, 12)

    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      picture: req.body.picture,
    })

    res.render("./auth/message.ejs")
  } catch (error) {
    console.error("Error registering user:", error.message)
  }
}

const showSignUpPage = async (req, res) => {
  try {
    res.render("auth/sign-up.ejs")
  } catch (error) {
    res.status(404).json({
      message: "⚠️ An error has occurred showing the Sign Up Page!",
      error: error.message,
    })
  }
}

const showSignInPage = async (req, res) => {
  try {
    res.render("auth/sign-in.ejs")
  } catch (error) {
    res.status(404).json({
      message: "⚠️ An error has occurred showing the Sign In Page!",
      error: error.message,
    })
  }
}

const signInUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.send("No user with that email!")

    const valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) return res.send("Incorrect password!")

    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      picture: user.picture,
    }
    req.session.save(() => res.redirect("/user/profile"))
  } catch (error) {
    console.error("Error signing in user:", error.message)
  }
}

const signOutUser = (req, res) => {
  req.session.destroy(() => res.redirect("/"))
}

module.exports = {
  registerUser,
  showSignUpPage,
  showSignInPage,
  signInUser,
  signOutUser,
}
