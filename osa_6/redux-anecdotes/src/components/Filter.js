import React from "react"
import {filterChange} from "../reducers/filterReducer"
import {connect} from "react-redux"

const Filter = (props) => {
	const handleChange = (event) => {
		const filter = event.target.value
		props.filterChange(filter)
	}
	const resetHandler = () => {
		props.filterChange("")
	}

	const style = {
		marginBottom: 10
	}

	return (
		<div style={style}>
			<form>
				filter <input name="filter" onChange={handleChange} />
				<button type="reset" onClick={resetHandler}>reset</button>
			</form>
		</div>
	)
}


export default connect(
	null,
	{filterChange}
)(Filter)