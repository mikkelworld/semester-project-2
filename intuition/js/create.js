import { isUserSignedIn } from "./utils/auth.js";
import { createProduct } from "./utils/adminActions.js";
import createAccountNav from "./components/header.js";

// Redirect if user isn't authenticated
if (!isUserSignedIn())
	location.href = "./index.html";

// Change the nav based on user auth status
createAccountNav();

// Get the product form and its elements
const productForm = document.querySelector('#newProductForm');
const clearFormButton = document.querySelector("#buttonClearForm");
const newProductAlert = document.querySelector("#newProductAlert");
const titleField = document.querySelector("#inputTitle");
const titleError = document.querySelector("#inputTitleError");
const descriptionField = document.querySelector("#inputDescription");
const descriptionError = document.querySelector("#inputDescriptionError");
const priceField = document.querySelector("#inputPrice");
const priceError = document.querySelector("#inputPriceError");
const imageField = document.querySelector("#inputImage");
const imageError = document.querySelector("#inputImageError");
const featuredField = document.querySelector("#inputFeatured");

// Add eventlisteners
productForm.addEventListener("submit", validateForm);

clearFormButton.addEventListener("click", function() {
	productForm.reset();
	newProductAlert.innerHTML = "";
});

// Validates the form and attempts to make the product
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

	// Attempt to create product if no errors were found
	if (!error) {
		createProduct(product).then(function(data) {
			if (data != null) {
				productForm.reset();
			}
		});
	}

	event.stopPropagation();
	event.preventDefault();
}