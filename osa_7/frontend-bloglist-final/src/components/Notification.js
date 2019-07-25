import React from "react"
import {Alert} from "react-bootstrap"
import {connect} from "react-redux"

const Notification = (props) => {
	const message = props.notification
	if (message === null) {
		return null
	}

	return (
		<div>
			{(message &&
				<Alert variant="success">
					{message}
				</Alert>
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

export default connect(mapStateToProps)(Notification)