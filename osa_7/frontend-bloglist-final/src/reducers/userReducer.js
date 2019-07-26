import userService from "../services/users"

export const addUser = newUser => {
	return async dispatch => {
		const addedUser = await userService.create(newUser)
		dispatch({
			type: "ADD_USER",
			data: {...addedUser,
				user: {
					username: newUser.user.username,
					user: newUser.user.user,
					id: newUser.user.id
				}
			}
		})
	}
}

export const removeUser = deletableUser => {
	return async dispatch => {
		await userService.remove(deletableUser.id)
		dispatch({
			type: "REMOVE_USER",
			data: deletableUser
		})
	}
}

export const initialUsers = () => {
	return async dispatch => {
		const allUsers = await userService.getAll()
		dispatch({
			type: "INIT_USERS",
			data: allUsers
		})
	}
}

const userReducer = (state = [], action) => {
	switch (action.type) {
	case "ADD_USER":
		const userObject = {...action.data}
		return state.concat(userObject).sort((a, b) => {
			return b.likes - a.likes
		})
	case "REMOVE_USER":
		const removeObject = action.data
		return state.filter(user => user.id !== removeObject.id)
	case "INIT_USERS":
		return action.data.sort((a, b) => {
			return b.blogs.length - a.blogs.length
		})
	default:
		return state
	}
}

export default userReducer