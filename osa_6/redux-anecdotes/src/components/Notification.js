import React from "react"
import {connect} from "react-redux"

const Notification = (props) => {
	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1
	}
	const currentNotification = props.notification
	if (currentNotification !== null)
		return (
			<div style={style}>
				{currentNotification}
			</div>
		)
	return null
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

export default connect(
	mapStateToProps
)(Notification)