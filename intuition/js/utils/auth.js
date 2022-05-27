import { baseUrl } from "../settings/api.js";
import { setKeyVal, getToken } from "./storage.js";
import displayMessage from "./displayMessage.js";

// Checks if we are currently signed in
export function isUserSignedIn() {
	if (getToken && getToken().length > 0)
		return true;
	else
		return false;
}

// Signs in user with the provided credentials and handles errors
export async function signIn(username, password) {
	const url = baseUrl + "/auth/local";
	const data = JSON.stringify({ identifier: username, password: password });

	const options = {
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/json"
		}
	}

	try {
		// Send request to the API
		const response = await fetch(url, options);
		const json = await response.json();

		// Check for successful login
		if (json.user) {
			// Save the user and token in localStorage
			setKeyVal("user", json.user);
			setKeyVal("token", json.jwt);
			// Redirect the user to the front page
			location.href = "./index.html";
		}
		else if (json.error) {
			// Show an error message to the user
			displayMessage("danger", "The username or password is incorrect.", "#loginAuthAlert");
		}
	}
	catch (error) {
		// Something went wrong with the request itself, the API may not be responding.
		displayMessage("danger", "Something went wrong! Try again in a few minutes.", "#loginAuthAlert");
		console.error(error);
	}

}

// Clears user related data from localStorage and redirects to front page
export function signOut() {
	// Clear localStorage of user data
	setKeyVal("user", "");
	setKeyVal("token", "");
	// Reloads the page. Could redirect to front page, but pages that require authentication should redirect user instead if not permitted
	location.reload();
}