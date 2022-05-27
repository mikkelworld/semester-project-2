import { baseUrl } from "./settings/api.js";
import { isUserSignedIn } from "./utils/auth.js";
import { editProduct } from "./utils/adminActions.js";
import createAccountNav from "./components/header.js";
import displayMessage from "./utils/displayMessage.js";

// Redirect if user isn't authenticated
if (!isUserSignedIn())
	location.href = "./index.html";

// Change the nav based on user auth status
createAccountNav();

// Get the product ID from the URL parameters
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

// Redirect to shop if no ID is set
if (!productId)
	document.location.href = "./shop.html";

// API endpoint
const productUrl = baseUrl + "/products/" + productId;

// Get the product form and its elements
const productForm = document.querySelector("#edit-product-form");
const formTitle = document.querySelector("#form-title");
const clearFormButton = document.querySelector("#button-clear-form");
const editProductAlert = document.querySelector("#edit-product-alert");
const titleField = document.querySelector("#input-title");
const titleError = document.querySelector("#input-title-error");
const descriptionField = document.querySelector("#input-description");
const descriptionError = document.querySelector("#input-description-error");
const priceField = document.querySelector("#input-price");
const priceError = document.querySelector("#input-price-error");
const imageField = document.querySelector("#input-image");
const imageError = document.querySelector("#input-image-error");
const featuredField = document.querySelector("#input-featured");

// Get the product data from API
(async function () {
	try {
		const response = await fetch(productUrl);
		const product = await response.json();

		// Fill in the product data we retrieved
		formTitle.innerText = product.title;
		titleField.value = product.title;
		descriptionField.value = product.description;
		priceField.value = product.price;
		imageField.value = product.image_url;
		featuredField.value = product.featured;

	} catch (error) {
		displayMessage("warning", "Something went wrong while getting the product details. Click <a href='./shop.html'>here</a> to return to the shop.", "#edit-product-alert");
	}
})();

// Add eventlisteners
productForm.addEventListener("submit", validateForm);

clearFormButton.addEventListener("click", function() {
	productForm.reset();
	editProductAlert.innerHTML = "";
});

// Validates the form and attempts to update the product
function validateForm() {
	// Flag to check for validation errors
	let error = false;

	// Get form values
	const title = titleField.value.trim();
	const description = descriptionField.value.trim();
	const price = priceField.value;
	const image = imageField.value.trim();
	const featured = featuredField.value;

	const product = {
		id: productId,
		title: title,
		description: description,
		price: price,
		image_url: image,
		featured: featured
	};

	// Check for errors
	titleError.style.display = title.length >= 3 ? "none" : (error = true, "block");
	descriptionError.style.display = description.length >= 10 ? "none" : (error = true, "block");
	priceError.style.display = price >= 1 && price <= 9999 ? "none" : (error = true, "block");
	imageError.style.display = image != "" ? "none" : (error = true, "block");

	// Attempt to update product if no errors were found
	if (!error) {
		editProduct(product);
	}

	event.stopPropagation();
	event.preventDefault();
}