const notificationAtStart = null

export const notificationChange = (notificationMsg, displayTime) => {
	return async dispatch => {
		await dispatch({
			type: "CHANGE",
			notification: notificationMsg
		})
		setTimeout(() => dispatch({
			type: "CHANGE",
			notification: null
		}), displayTime * 1000)
	}
}

const notificationReducer = (state = notificationAtStart, action) => {
	// console.log("state now: ", state)
	// console.log("action", action)
	switch (action.type) {
	case "CHANGE":
		return action.notification
	default:
		return state
	}
}

export default notificationReducer