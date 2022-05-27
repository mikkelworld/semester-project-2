import { isUserSignedIn, signIn } from "./utils/auth.js";
import createAccountNav from "./components/header.js";

// Change the nav based on user auth status
createAccountNav();

// Redirect if we're already logged in
if (isUserSignedIn()) {
	location.href = "./index.html";
}

// Get the login form and related elements
const loginForm = document.querySelector('#loginForm');
const usernameField = document.querySelector("#inputUsername");
const usernameError = document.querySelector("#inputUsernameError");
const passwordField = document.querySelector("#inputPassword");
const passwordError = document.querySelector("#inputPasswordError");

// Add eventlistener for form submission
loginForm.addEventListener("submit", validateForm);

function validateForm() {
	// Flag to check for validation errors
	let error = false;

	// Get form values
	const username = usernameField.value.trim();
	const password = passwordField.value.trim();

	// Check values. Display error message and set flag if invalid
	usernameError.style.display = username.length >= 3 ? "none" : (error = true, "block");
	passwordError.style.display = password.length >= 6 ? "none" : (error = true, "block");

	// Attempt login if not invalid
	if (!error)
		signIn(username, password);

	event.stopPropagation();
	event.preventDefault();
}