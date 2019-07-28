//Reducer and all of the action creators involving state.blogs

import blogService from "../services/blogs"

export const vote = blog => {
	return async dispatch => {
		const votedBlog = await blogService.update(blog)
		dispatch({
			type: "VOTE",
			data: votedBlog
		})
	}
}

export const addBlog = newBlog => {
	return async dispatch => {
		const addedBlog = await blogService.create(newBlog)
		dispatch({
			type: "ADD_BLOG",
			data: {...addedBlog,
				user: {
					username: newBlog.user.username,
					user: newBlog.user.user,
					id: newBlog.user.id
				}
			}
		})
	}
}

export const removeBlog = deletableBlog => {
	return async dispatch => {
		await blogService.remove(deletableBlog.id)
		dispatch({
			type: "REMOVE_BLOG",
			data: deletableBlog
		})
	}
}

export const updateBlog = blogToUpdate => {
	return async dispatch => {
		const updatedBlog = await blogService.update(blogToUpdate)
		dispatch({
			type: "UPDATE_BLOG",
			data: updatedBlog
		})
	}
}

export const initialBlogs = () => {
	return async dispatch => {
		const allBlogs = await blogService.getAll()
		dispatch({
			type: "INIT_BLOGS",
			data: allBlogs
		})
	}
}

const blogReducer = (state = [], action) => {
	switch (action.type) {
	case "VOTE":
		const id = action.data.id
		const blogToChange = state.find(n => n.id === id)
		const changedBlog = {
			...blogToChange,
			likes: blogToChange.likes + 1
		}
		return state.map(blog =>
			blog.id !== id ? blog : changedBlog
		).sort((a, b) => {
			return b.likes - a.likes
		})
	case "ADD_BLOG":
		const blogObject = {...action.data}
		return state.concat(blogObject).sort((a, b) => {
			return b.likes - a.likes
		})
	case "REMOVE_BLOG":
		const removeObject = action.data
		return state.filter(blog => blog.id !== removeObject.id)
	case "UPDATE_BLOG":
		const updateObject = action.data
		console.log(updateObject)
		return state.map(blog =>
			blog.id !== updateObject.id ? blog : updateObject
		).sort((a, b) => {
			return b.likes - a.likes
		})
	case "INIT_BLOGS":
		return action.data.sort((a, b) => {
			return b.likes - a.likes
		})
	default:
		return state
	}
}

export default blogReducer