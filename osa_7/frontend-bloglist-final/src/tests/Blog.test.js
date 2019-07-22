import React from "react"
import {render, fireEvent} from "@testing-library/react"
import {prettyDOM} from "@testing-library/dom"
import Blog from "./SimpleBlog"

test("Correct content rendered", () => {
	const blog = {
		title: "Masamuna",
		author: "Muna-Masa",
		url: "www.masa.com",
		likes: 213
	}

	const component = render(
		<Blog blog={blog} />
	)

	const div = component.container.querySelector(".blog")
	expect(div).toHaveTextContent(
		"Masamuna", "Muna-Masa", "blog has 213 likes"
	)
})

test("Clicking button twice calls the button event handler two times", async () => {
	const blog = {
		title: "Masamuna",
		author: "Muna-Masa",
		url: "www.masa.com",
		likes: 213
	}

	const mockHandler = jest.fn()

	const {getByText} = render(
		<Blog blog={blog} onClick={mockHandler} />
	)

	const button = getByText("like")
	fireEvent.click(button)
	fireEvent.click(button)

	expect(mockHandler.mock.calls.length).toBe(2)
})