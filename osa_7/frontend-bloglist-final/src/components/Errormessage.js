import React from "react"
import {Alert} from "react-bootstrap"
import {connect} from "react-redux"

const Errormessage = (props) => {
	const message = props.error
	if (message === null) {
		return null
	}

	return (
		<div>
			{(message &&
				<Alert variant="danger">
					{message}
				</Alert>
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		error: state.error
	}
}

export default connect(mapStateToProps)(Errormessage)