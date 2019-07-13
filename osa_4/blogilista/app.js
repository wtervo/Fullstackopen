const config = require("./utils/config")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")
const logger = require("./utils/logger")

const mongoUrl = config.MONGODB_URL
logger.info("Connecting to", config.MONGODB_URL)
mongoose.connect(mongoUrl, {useNewUrlParser: true})
	.then(() => {
		logger.info("Connected to MongoDB")
	})
	.catch((error) => {
		logger.error("Error while connecting to MongoDB:", error.message)
	})

app.use(cors())
app.use(bodyParser.json())

app.use("/api/blogs", blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app