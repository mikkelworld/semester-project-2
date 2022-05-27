import { baseUrl } from "../settings/api.js";
import displayMessage from "./displayMessage.js";
import { setKeyVal, getKeyVal } from "./storage.js";

// Adds the given product ID to the cart
export function addToCart(productId, productPrice) {

	// Get the current cart from localStorage
	let cartItems = getKeyVal("cart");
	// Check if product already exists in cart
	let productIndex = cartItems.findIndex(item => item.id === productId);
	// Used to return our cart status
	let inCart = false;

	// If product is already in cart, remove it
	if (productIndex > -1) {
		removeFromCart(productId);
		inCart = false;
	}
	else {
		// Create new cart item if it doesn't exist
		cartItems.push({
			id: productId,
			quantity: 1,
			price: productPrice
		});

		// Save the new cart to localStorage and update nav
		setKeyVal("cart", cartItems);
		inCart = true;
	}

	updateCart();
	return inCart;
}

// Remove the given product from the cart
export function removeFromCart(productId) {

	// Get the current cart from localStorage
	let cartItems = getKeyVal("cart");
	// Filter out the cart item with the product ID we are looking for
	cartItems = cartItems.filter(item => item.id !== productId);
	// Save the new cart to localStorage and update nav
	setKeyVal("cart", cartItems);
	updateCart();

}

// Change the quantity of a given item in the cart
export function changeQuantity(productId, newQuantity) {

	// Get the current cart from localStorage
	let cartItems = getKeyVal("cart");

	// Find the specified item
	let productIndex = cartItems.findIndex(item => item.id === productId);

	if (productIndex > -1) {
		// Increment quantity if it already exists
		cartItems[productIndex].quantity = newQuantity;

		// Save the new cart to localStorage
		setKeyVal("cart", cartItems);
	}
}

// Returns the number of items in the cart
export function getNumberOfItemsInCart() {
	return getKeyVal("cart").length;
}

// Sets the Cart nav item text to reflect the number of items in the cart
export function updateCart() {
	let navItem = document.querySelector("#nav-cart");

	if (navItem != null)
		navItem.innerText = `Cart (${getNumberOfItemsInCart()})`;

	let cartAlert = document.querySelector("#cart-alert");

	if (cartAlert != null && getNumberOfItemsInCart() === 0)
		displayMessage("info", "Your shopping cart is empty. <a href='./shop.html'>Visit the shop</a> to add some items!", "#cart-alert");
}

// Retrieves the cart from localStorage
export function getCart() {
	return getKeyVal("cart");
}

// Returns the total price of the items in the cart
export function getCartTotal() {
	let cartTotal = 0;
	let cartItems = getCart();

	if (cartItems.length > 0) {
		cartItems.forEach(item => {
			cartTotal += item.price * item.quantity;
		});
	}

	return cartTotal;
}

// Returns an array of all the products in the cart from API
export async function getProductsInCart() {

	// Get our cart from localStorage
	let cartItems = getKeyVal("cart");

	if (cartItems.length > 0) {
		try {
			const response = await fetch(baseUrl + "/products");
			const json = await response.json();

			// Filter the list by the id's in our cart
			let filteredProducts = json.filter(function (product) {
				return cartItems.find(item => item.id === product.id) != null;
			});

			return filteredProducts;

		} catch (error) {
			console.error(error);
		}
	}

	return null;
}