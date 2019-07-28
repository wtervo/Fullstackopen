//Reducer and all of the action creators involving state.notification

const notificationAtStart = null

export const notificationChange = (notificationMsg, displayTime) => {
	return async dispatch => {
		await dispatch({
			type: "CHANGE_NOTIFICATION",
			notification: notificationMsg
		})
		setTimeout(() => dispatch({
			type: "CHANGE_NOTIFICATION",
			notification: null
		}), displayTime * 1000)
	}
}

const notificationReducer = (state = notificationAtStart, action) => {
	switch (action.type) {
	case "CHANGE_NOTIFICATION":
		return action.notification
	default:
		return state
	}
}

export default notificationReducer