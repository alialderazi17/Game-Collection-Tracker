const bcrypt = require("bcrypt")
const User = require("../models/User")

const registerUser = async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email })
    if (exists) return res.send("Email already taken!")

    if (req.body.password !== req.body.confirmPassword)
      return res.send("Passwords must match!")

    const hashedPassword = await bcrypt.hash(req.body.password, 12)

    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      picture: req.body.picture,
    })

    res.render("auth/message")
  } catch (error) {
    console.error("Error registering user:", error.message)
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
    req.session.save(() => res.redirect("/User/profile"))
  } catch (error) {
    console.error("Error signing in user:", error.message)
  }
}

const signOutUser = (req, res) => {
  req.session.destroy(() => res.redirect("/"));
}

module.exports = { registerUser, signInUser, signOutUser }
