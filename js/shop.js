import { baseUrl } from "./settings/api.js";
import createAccountNav from "./components/header.js";
import displayMessage from "./utils/displayMessage.js";

// Change the nav based on user auth status
createAccountNav();

// Get product list container
var productList = document.querySelector("#product-list");
var searchBox = document.querySelector("#inputProductSearch");
var products = [];

// Get the products from API
(async function () {
	try {
		const response = await fetch(baseUrl + "/products");
		const json = await response.json();

		products = json;
	} catch (error) {
		console.error(error);
	} finally {
		if (products.length > 0) {
			createProductList(products);
		}
		else {
			notifyNoProductsFound();
		}
	}
})();

// Filters products by name or description and updates product list
searchBox.addEventListener("keyup", function (event) {
	var searchQuery = searchBox.value.toLowerCase();

	let filteredProducts = products.filter(function (product) {
		return product.title.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
	});

	if (filteredProducts.length === 0)
		notifyNoSearchResults();
	else
		createProductList(filteredProducts);
});

// Populates the product list with products from the API call
function createProductList(products) {

	// Empty productlist before we populate it
	productList.innerHTML = "";

	// Populate it with products
	products.forEach(product => {
		productList.appendChild(createProductListItem(product));
	});

}

// Returns a single product list item as an object
function createProductListItem(product) {
	var productColumn = document.createElement("div");
	productColumn.className = "col-12 col-sm-6 col-md-4 col-xl-3 mb-4";

	var productContainer = document.createElement("a");
	productContainer.className = "product-list-item";
	productContainer.href = `./product.html?id=${product.id}`;
	productColumn.appendChild(productContainer);

	var productImageContainer = document.createElement("div");
	productImageContainer.className = "product-list-item-image-container";
	productContainer.appendChild(productImageContainer);

	var productImage = document.createElement("img");
	productImage.className = "product-list-item-image";

	if (product.image != null && product.image.url != null)
		productImage.src = baseUrl + product.image.url;
	else if (product.image_url != null)
		productImage.src = product.image_url;
	else
		productImage.src = "./images/no-image.jpg"; // We don't allow adding products without images, but better safe than sorry

	productImageContainer.appendChild(productImage);

	var productTitle = document.createElement("h3");
	productTitle.className = "product-list-item-title";
	productTitle.innerText = product.title;
	productContainer.appendChild(productTitle);

	var productPrice = document.createElement("span");
	productPrice.className = "product-list-item-price";
	productPrice.innerText = `$${product.price}`;
	productContainer.appendChild(productPrice);

	return productColumn;
}

// Displays a message to the user that no products were found
function notifyNoProductsFound() {

	// Clear the product list to make sure it's empty
	productList.innerHTML = "";

	// Create and append a wrapper element
	var messageContainer = document.createElement("div");
	messageContainer.className = "col";
	productList.appendChild(messageContainer);

	// Create the message inside the wrapper
	displayMessage("danger", "No products found. Try reloading the page.", messageContainer);

}

// Displays a message to the user that no products were found
function notifyNoSearchResults() {
	// Clear the product list to make sure it's empty
	productList.innerHTML = "";

	// Create and append a wrapper element
	var messageContainer = document.createElement("div");
	messageContainer.className = "col";
	productList.appendChild(messageContainer);

	// Create the message inside the wrapper
	displayMessage("warning", "No products match your search term. Please try a different search or reload the page.", messageContainer);
}