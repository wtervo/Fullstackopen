import loginService from "../services/login"
import blogService from "../services/blogs"

export const changeLogin = (username, password) => {
	return async dispatch => {
		console.log(username, password)
		const loginDetails = await loginService.login({username, password})
		console.log(loginDetails)
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
		console.log(action.data)
		return state.concat(action.data)
	case "RESET_LOGIN":
		return state = []
	default:
		return state
	}
}

export default loginReducer