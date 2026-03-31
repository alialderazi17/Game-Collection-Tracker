<<<<<<< HEAD
require("dotenv").config({ quiet: true })
=======
const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])
///////////////////////////////////////////
require("dotenv").config()
>>>>>>> 415e402c22844ab658871c190499acef77de5704
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
<<<<<<< HEAD
const { MongoStore } = require("connect-mongo")
const app = express()
const path = require("path")
const PORT = process.env.PORT ? process.env.PORT : 3000
const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])
const db = require("./db")

=======
const MongoStore = require("connect-mongo")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

const db = require("./db")
const gameRouter = require("./Routes/gameRouter")
const reviewRouter = require("./Routes/reviewRouter")
const userRouter = require("./Routes/userRouter")
const authRouter = require("./Routes/authRouter")

const { isSignedIn } = require("./middleware")

app.set("view engine", "ejs")
>>>>>>> 415e402c22844ab658871c190499acef77de5704
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(morgan("dev"))
app.use(methodOverride("_method"))
<<<<<<< HEAD
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

app.get("/", (req, res) => {
  res.send("Welcome to the Game Tracker")
})

app.listen(PORT, () => {
  console.log(`🎮 Mongoose Gaming on ${PORT} . . .`)
=======

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
)

app.use(isSignedIn)

app.use("/game", gameRouter)
app.use("/review", reviewRouter)
app.use("/User", userRouter)
app.use("/auth", authRouter)

app.get("/", (req, res) => res.send("Welcome to the Game Collection Tracker"))

app.listen(PORT, () => {
  console.log(`🎮 Server running on port ${PORT}`)
>>>>>>> 415e402c22844ab658871c190499acef77de5704
})
