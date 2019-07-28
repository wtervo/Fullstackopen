//Reducer and all of the action creators involving state.login

import loginService from "../services/login"
import blogService from "../services/blogs"

export const changeLogin = (username, password) => {
	return async dispatch => {
		const loginDetails = await loginService.login({username, password})
		window.localStorage.setItem(
			"loggedBlogappUser", JSON.stringify(loginDetails)
		)
		blogService.setToken(loginDetails.token)
		dispatch({
			type: "CHANGE_LOGIN",
			data: loginDetails
		})
	}
}

export const resetLogin = () => {
	return async dispatch => {
		window.localStorage.removeItem("loggedBlogappUser")
		dispatch({
			type: "RESET_LOGIN"
		})
	}
}

const loginReducer = (state = [], action) => {
	switch (action.type) {
	case "CHANGE_LOGIN":
		return state.concat(action.data)
	case "RESET_LOGIN":
		return state = []
	default:
		return state
	}
}

export default loginReducer