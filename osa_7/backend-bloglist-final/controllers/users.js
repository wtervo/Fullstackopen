const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
	const users = await User.find({}).populate(
		"blogs", {title: 1, author: 1, url: 1, id: 1})
	response.json(users.map(u => u.toJSON()))
})

usersRouter.post("/", async (request, response, next) => {
	try {
		const body = request.body
		if (body.username === undefined || body.password === undefined) {
			return response.status(400).json({error: "Content missing"})
		}
		else if (body.username.length < 3) {
			return response.status(400).json({error: "Username is too short (min. 3 symbols)"})
		}
		else if (body.password.length < 3) {
			return response.status(400).json({error: "Password is too short (min. 3 symbols)"})
		}
		else if (body.username.length > 20) {
			return response.status(400).json({error: "Username is too long (max. 20 symbols)"})
		}
		else if (body.password.length > 25) {
			return response.status(400).json({error: "Password is too long (max. 25 symbols)"})
		}

		const saltRounds = 10
		const passwordHash = await bcrypt.hash(body.password, saltRounds)

		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash,
		})

		const savedUser = await user.save()

		response.json(savedUser)
	}
	catch (error) {
		next(error)
	}
})

module.exports = usersRouter