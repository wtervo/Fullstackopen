describe("Blogapp ", function() {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset")
		const user = {
			name: "robottijäbä",
			username: "testaaja",
			password: "imemunaa"
		}
		cy.request("POST", "http://localhost:3003/api/users", user)
		cy.visit("http://localhost:3000")
	})
	it("front page can be opened", function() {
		cy.contains("Welcome to my React bloglist app!")
	})

	it("login form can be opened", function() {
		cy.contains("Login")
			.click()
		cy.get("input:first")
			.type("testaaja")
		cy.get("input:last")
			.type("imemunaa")
		cy.get("#loginbutton")
			.click()
		cy.contains("Successfully logged in")
	})

	it("blog can be added", function() {
		cy.contains("Login")
			.click()
		cy.get("input:first")
			.type("testaaja")
		cy.get("input:last")
			.type("imemunaa")
		cy.get("#loginbutton")
			.click()
		cy.contains("Blogs")
			.click()
		cy.contains("Add a new blog")
			.click()
		cy.get("#title")
			.type("oh yeah")
		cy.get("#author")
			.type("testibotti")
		cy.get("#url")
			.type("www.paskonselallesiregardsrobotti.fi")
		cy.get("#likes")
			.type("9873201701")
		cy.get("#save")
			.click()
		cy.contains("by testibotti has been added to the collection")
	})

})