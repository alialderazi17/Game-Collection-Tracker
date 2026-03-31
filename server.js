require("dotenv").config({ quiet: true })
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
const { MongoStore } = require("connect-mongo")

const app = express()
const path = require("path")
const PORT = process.env.PORT ? process.env.PORT : 3000
const middleware = require("./middleware")
const authRouter = require("./routes/authRouter")
const userRouter = require("./routes/userRouter")
const reviewRouter = require("./routes/reviewRouter")
const gameRouter = require("./routes/gameRouter")
const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])
const db = require("./db")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
)
app.use(middleware.passUserToView)
app.use("/auth", authRouter)
app.use("/games", gameRouter)
app.use("/reviews", reviewRouter)
app.use("/user", userRouter)

app.get("/", (req, res) => {
  // res.send("Welcome to the Game Tracker")
  res.render("index.ejs")
})

app.listen(PORT, () => {
  console.log(`🎮 Mongoose Gaming on ${PORT} . . .`)
})
