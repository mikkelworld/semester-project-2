import { baseUrl } from "./settings/api.js";
import { getCart, getCartTotal, removeFromCart, changeQuantity } from "./utils/cartUtils.js";
import { getSingleProduct, getProductImageUrl } from "./utils/productUtils.js";
import createAccountNav from "./components/header.js";
import displayMessage from "./utils/displayMessage.js";

// Change the nav based on user auth status
createAccountNav();

const cartList = document.querySelector("#cart-list");
const cartTotal = document.querySelector("#cart-total");
const cartEntries = getCart();

let cartTotalValue = 0;

(async function () {
	if (cartEntries.length < 1) {
		displayMessage("info", "Your shopping cart is empty. <a href='./shop.html'>Visit the shop</a> to add some items!", "#cart-alert");
	}

	try {
		cartEntries.forEach(item => {
			getSingleProduct(item.id).then(function (product) {
				// Create the cart item
				createCartItem(product, item.quantity);
				updateCartTotal();
			});
		});
	} catch (error) {
		console.error(error);
	}
})();

// Creates a single cart item in the list
function createCartItem(product, quantity) {
	const productImageUrl = getProductImageUrl(product);

	const cartItem = document.createElement("li");
	cartItem.className = "list-group-item cart-item";
	cartItem.innerHTML = `<div class="row">
		<img class="cart-item-image" src="${productImageUrl}" alt="${product.title}">
		<div class="cart-item-details">
			<h4>${product.title}</h4>
			<p>$${product.price}</p>
			<a href="./product.html?id=${product.id}">View product</a>
			<label for="input-item-quantity">Quantity:</label>
			<input type="number" class="form-control" id="input-quantity-${product.id}" value="${quantity}">
		</div>
		<div class="col cart-item-total">
			<div>
				<small>Total:</small>
				<h4 id="product-total-${product.id}">$${product.price * quantity}</h4>
			</div>
			<button class="btn btn-outline-danger" id="btn-remove-${product.id}">Remove</button>
		</div>
	</div>`;

	// Add it to the page
	cartList.append(cartItem);

	// Handles changing quantity
	document.querySelector(`#input-quantity-${product.id}`).addEventListener("change", function (event) {
		// Get the new quantity
		const newQuantity = event.target.value;

		// Handle quantity of 0 or below
		if (newQuantity <= 0) {
			removeFromCart(product.id);
			cartItem.remove();
		}
		else {
			// Update localStorage
			changeQuantity(product.id, newQuantity);
			// Set the new total price
			document.querySelector(`#product-total-${product.id}`).innerText = `$${Number(product.price * newQuantity).toFixed(2)}`;
		}

		updateCartTotal();
		event.stopPropagation();
	});

	// Handles removing an item from the list
	document.querySelector(`#btn-remove-${product.id}`).addEventListener("click", function () {
		removeFromCart(product.id);
		cartItem.remove();

		updateCartTotal();
		event.stopPropagation();
	});
}

// Updates the cart total text
function updateCartTotal() {
	cartTotalValue = getCartTotal();
	cartTotal.innerText = `$${Number(cartTotalValue).toFixed(2)}`;
}