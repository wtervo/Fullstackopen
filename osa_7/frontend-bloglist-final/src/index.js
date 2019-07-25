
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {Provider} from "react-redux"
import thunk from "redux-thunk"
import {createStore, combineReducers, applyMiddleware} from "redux"
import notificationReducer from "./reducers/notificationReducer"
import errorReducer from "./reducers/errorReducer"

const reducer = combineReducers({
	notification: notificationReducer,
	error: errorReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById("root")
	)
}

render()
store.subscribe(render)