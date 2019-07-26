//index file for the bloglist app's frontend

import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {Provider} from "react-redux"
import thunk from "redux-thunk"
import {createStore, combineReducers, applyMiddleware} from "redux"
import blogReducer from "./reducers/blogReducer"
import loginReducer from "./reducers/loginReducer"
import notificationReducer from "./reducers/notificationReducer"
import errorReducer from "./reducers/errorReducer"
import userReducer from "./reducers/userReducer"

const reducer = combineReducers({
	blogs: blogReducer,
	users: userReducer,
	login: loginReducer,
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