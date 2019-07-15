const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")
const User = require("../models/user")

const api = supertest(app)

describe("When there is initially one user at db", () => {
	beforeEach(async () => {
		await User.deleteMany({})
		const user = new User({username: "root", password: "dobsegred"})
		await user.save()
	})

	test("Creation succeeds with a fresh username", async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: "wtervo",
			name: "Oskari Tervo",
			password: "superpassu",
		}

		await api
			.post("/api/users")
			.send(newUser)
			.expect(200)
			.expect("Content-Type", /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test("Creation fails with proper statuscode and message if username already taken", async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: "root",
			name: "Superuser",
			password: "enkerro",
		}

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/)

		expect(result.body.error).toContain("`username` to be unique")

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd.length).toBe(usersAtStart.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})