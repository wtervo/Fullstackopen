import React from "react"
import {Alert} from "react-bootstrap"

const Errormessage = ({message}) => {
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

export default Errormessage