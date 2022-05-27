import { baseUrl } from "./settings/api.js";
import { isUserSignedIn } from "./utils/auth.js";
import { getProductImageUrl } from "./utils/productUtils.js";
import { addToCart, getCart } from "./utils/cartUtils.js";
import { createAdminMenu } from "./components/adminMenu.js";
import createAccountNav from "./components/header.js";
import displayMessage from "./utils/displayMessage.js";

// Change the nav based on user auth status
createAccountNav();

// Get the product ID from the URL parameters
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const productId = params.get("id");

// Redirect to shop if no ID is set
if (!productId)
	document.location.href = "./shop.html";
else {
	// Create admin menu for logged in users
	if (isUserSignedIn())
		createAdminMenu(productId);
}

const productUrl = baseUrl + "/products/" + productId;

const productAlert = document.querySelector("#product-alert");
const productWrapper = document.querySelector("#product-wrapper");

// Product details
const productTitle = document.querySelector("#product-title");
const productDescription = document.querySelector("#product-description");
const productPrice = document.querySelector("#product-price");
const productImage = document.querySelector("#product-image");
const addToCartButton = document.querySelector("#btn-cart");

// Get the product data from API
(async function () {
	try {
		const response = await fetch(productUrl);
		const product = await response.json();

		document.querySelector("title").innerText = `${product.title} - Intuition`;

		// Fill in the product data we retrieved
		createProduct(product);
		// Clear the spinner
		productAlert.innerHTML = "";
		// Show the product data
		productWrapper.classList.remove("d-none");
	} catch (error) {
		console.log(error);
		displayMessage("warning", "Something went wrong while getting the product details. Click <a href='./shop.html'>here</a> to return to the shop.", "#product-alert");
	}
})();

// Populates the page with the product data provided
function createProduct(product) {
	// Set initial text
	if (getCart().find(item => item.id === product.id)) {
		addToCartButton.innerText = "Remove from cart";
	}

	// Set the values of product details
	productTitle.innerText = product.title;
	productDescription.innerText = product.description;
	productPrice.innerText = `$${product.price.toString()}`;
	productImage.src = getProductImageUrl(product);
	productImage.alt = product.title;

	// Handle add to cart button click
	addToCartButton.addEventListener("click", function (event) {
		var isProductInCart = addToCart(product.id, product.price);

		if (isProductInCart) {
			addToCartButton.innerText = "Remove from cart";
		}
		else {
			addToCartButton.innerText = "Add to cart";
		}

		event.stopPropagation();
	});
}