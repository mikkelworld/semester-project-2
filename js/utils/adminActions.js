import { baseUrl } from "../settings/api.js";
import { getToken } from "./storage.js";
import displayMessage from "./displayMessage.js";

// Tries to make a product in the API from the productData provided
export async function createProduct(productData) {
	// Get token when we submit, in case something happened between page load and submission
	const authToken = getToken();

	if (authToken) {
		const url = baseUrl + "/products";
		const data = JSON.stringify(productData);

		const options = {
			method: "POST",
			body: data,
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authToken}`
			}
		}

		try {
			// Send request to the API
			const response = await fetch(url, options);
			const json = await response.json();

			// Check for success
			if (json) {
				console.log(json);
				displayMessage("success", `Product successfully added! Click <a href="./product.html?id=${productData.id}">here</a> to see the product page.`, "#newProductAlert");
				return json;
			}
			else if (json.error) {
				// Show an error message to the user
				displayMessage("danger", "Unable to create product", "#newProductAlert");
				return null;
			}
		}
		catch (error) {
			// Something went wrong with the request itself, the API may not be responding.
			displayMessage("danger", "Something went wrong! Try again in a few minutes.", "#newProductAlert");
			console.error(error);
			return null;
		}
	}
	else {
		displayMessage("danger", "Unauthorized access. Try <a href='./login.html'>logging in</a> again.", "#newProductAlert");
		return null;
	}
}

// Tries to update a product in the API
export async function editProduct(productData) {
	// Get token when we submit, in case something happened between page load and submission
	const authToken = getToken();

	if (authToken) {
		const url = baseUrl + `/products/${productData.id}`;
		const data = JSON.stringify(productData);

		const options = {
			method: "PUT",
			body: data,
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authToken}`
			}
		}

		try {
			// Send request to the API
			const response = await fetch(url, options);
			const json = await response.json();

			// Check for success
			if (json) {
				console.log(json);
				displayMessage("success", `Product successfully updated! Click <a href="./product.html?id=${productData.id}">here</a> to see the product page.`, "#edit-product-alert");
				return json;
			}
			else if (json.error) {
				// Show an error message to the user
				displayMessage("danger", "Unable to update product", "#edit-product-alert");
				return null;
			}
		}
		catch (error) {
			// Something went wrong with the request itself, the API may not be responding.
			displayMessage("danger", "Something went wrong! Try again in a few minutes.", "#edit-product-alert");
			return null;
		}
	}
	else {
		displayMessage("danger", "Unauthorized access. Try <a href='./login.html'>logging in</a> again.", "#edit-product-alert");
		return null;
	}
}

// Tries to delete a product from the API
export async function deleteProduct(productId) {
	// Get token when we submit, in case something happened between page load and submission
	const authToken = getToken();

	if (authToken) {
		const url = baseUrl + `/products/${productId}`;
		const data = JSON.stringify(productId);

		const options = {
			method: "DELETE",
			body: data,
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authToken}`
			}
		}

		try {
			// Send request to the API
			const response = await fetch(url, options);
			const json = await response.json();

			// Check for success
			if (json) {
				console.log(json);
				displayMessage("success", `The product was deletes successfully! Click <a href="./shop.html">here</a> to return to the shop.`, "#product-alert");
				return json;
			}
			else if (json.error) {
				// Show an error message to the user
				displayMessage("danger", "Unable to delete product", "#product-alert");
				return null;
			}
		}
		catch (error) {
			// Something went wrong with the request itself, the API may not be responding.
			displayMessage("danger", "Something went wrong! Try again in a few minutes.", "#product-alert");
			return null;
		}
	}
	else {
		displayMessage("danger", "Unauthorized access. Try <a href='./login.html'>logging in</a> again.", "#product-alert");
		return null;
	}
}