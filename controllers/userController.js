const User = require("../models/User")

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    const data = {
      _id: user._id,
      username: user.username,
      email: user.email,
      picture: user.picture,
    }
    res.render("user/profile.ejs", { user: data })
  } catch (error) {
    console.error("Error fetching profile:", error.message)
    res.redirect("/")
  }
}

module.exports = {
  getUserProfile,
}
