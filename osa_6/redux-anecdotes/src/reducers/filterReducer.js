export const filterChange = filter => {
	return {
		type: "FILTER",
		filter
	}
}

const initialFilter = ""

const FilterReducer = (state = initialFilter, action) => {
	// console.log("state now: ", state)
	// console.log("action", action)
	switch (action.type) {
	case "FILTER":
		return action.filter
	default:
		return state
	}
}

export default FilterReducer