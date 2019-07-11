const config = require("./utils/config")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")


const mongoUrl = config.MONGODB_URL
console.log("Connecting to MongoDB...")
mongoose.connect(mongoUrl, {useNewUrlParser: true})
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.log("Error while connecting to MongoDB:", error.message)
    })

app.use(cors())
app.use(bodyParser.json())

app.use("/api/blogs", blogsRouter)

app.use(middleware.unknownEndpoint)

module.exports = app