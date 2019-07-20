const notificationAtStart = null

export const notificationChange = notification => {
	return {
		type: "CHANGE",
		notification
	}
}

const notificationReducer = (state = notificationAtStart, action) => {
	console.log("state now: ", state)
	console.log("action", action)
	switch (action.type) {
	case "CHANGE":
		return action.notification
	default:
		return state
	}
}

export default notificationReducer