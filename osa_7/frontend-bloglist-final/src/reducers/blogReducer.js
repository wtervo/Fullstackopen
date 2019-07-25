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
			type: "ADD",
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
		console.log(deletableBlog)
		await blogService.remove(deletableBlog.id)
		dispatch({
			type: "REMOVE",
			data: deletableBlog
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
	case "ADD":
		const blogObject = {...action.data}
		return state.concat(blogObject).sort((a, b) => {
			return b.likes - a.likes
		})
	case "REMOVE":
		const removeObject = action.data
		return state.filter(blog => blog.id !== removeObject.id)
	case "INIT_BLOGS":
		return action.data.sort((a, b) => {
			return b.likes - a.likes
		})
	default:
		return state
	}
}

export default blogReducer