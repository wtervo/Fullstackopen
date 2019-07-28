//Reducer and all of the action creators involving state.errors

const errorAtStart = null

export const errorChange = (errorMsg, displayTime) => {
	return async dispatch => {
		await dispatch({
			type: "CHANGE_ERROR",
			error: errorMsg
		})
		setTimeout(() => dispatch({
			type: "CHANGE_ERROR",
			error: null
		}), displayTime * 1000)
	}
}

const errorReducer = (state = errorAtStart, action) => {
	switch (action.type) {
	case "CHANGE_ERROR":
		return action.error
	default:
		return state
	}
}

export default errorReducer