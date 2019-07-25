const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")


blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate(
		"user", {username: 1, name: 1}
	)
	response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get("/:id", async (request, response, next) => {
	try {
		const blog = await Blog.findById(request.params.id)
		if (blog) {
			response.json(blog.toJSON())
		}
		else {
			response.status(404).end()
		}
	}
	catch (error) {
		next(error)
	}
})

blogsRouter.post("/", async (request, response, next) => {
	const body = request.body
	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		if (!request.token || !decodedToken.id) {
			return response.status(401).json({error: "Token missing or invalid"})
		}
		else if (!body.title || !body.author || !body.url)
			return response.status(400).json({error: "One of the required fields is missing"})
		const user = await User.findById(decodedToken.id)

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: user._id
		})
		const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
		response.json(savedBlog.toJSON())
	}
	catch (error) {
		next(error)
	}
})

blogsRouter.delete("/:id", async (request, response, next) => {
	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		if (!request.token || !decodedToken.id) {
			return response.status(401).json({error: "Token missing or invalid"})
		}
		const user = await User.findById(decodedToken.id)
		const blog = await Blog.findById(request.params.id)
		if (blog.user.toString() !== user.id.toString()) {
			return response.status(401).json({
				error: `User ${user.username.toString()} is not authorized to remove this blog`
			})
		}
		else {
			await Blog.findByIdAndRemove(request.params.id)
			response.status(204).end()
		}
	}
	catch (error) {
		next(error)
	}
})

blogsRouter.put("/:id", async (request, response, next) => {
	const body = request.body

	const updateBlogObject = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	}
	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		if (!request.token || !decodedToken.id) {
			return response.status(401).json({error: "Token missing or invalid"})
		}
		const user = await User.findById(decodedToken.id)
		const blog = await Blog.findById(request.params.id)
		if (blog.user.toString() !== user.id.toString()) {
			return response.status(401).json({
				error: `User ${user.username.toString()} is not authorized to edit this blog`
			})
		}
		else {
			const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updateBlogObject, {new: true})
			response.json(updatedBlog.toJSON())
		}
	}
	catch (error) {
		next(error)
	}
})

module.exports = blogsRouter