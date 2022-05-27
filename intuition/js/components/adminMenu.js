import { deleteProduct } from "../utils/adminActions.js";

// Creates admin only buttons
export function createAdminMenu(productId) {
	const productWrapper = document.querySelector("#product-wrapper");

	const adminMenu = document.createElement("div");
	adminMenu.className = "d-flex justify-content-end mb-4";

	const deleteButton = document.createElement("button");
	deleteButton.className = "btn btn-outline-danger me-2";
	deleteButton.innerText = "Delete product";

	const editButton = document.createElement("a");
	editButton.className = "btn btn-outline-secondary";
	editButton.innerText = "Edit product";
	editButton.href = `./edit.html?id=${productId}`;

	adminMenu.append(deleteButton, editButton);
	productWrapper.parentElement.prepend(adminMenu);

	deleteButton.addEventListener("click", function(event) {

		confirmDeleteProduct(productId);

		event.stopPropagation();
	});
}

// Deletes the product on confirmation
export function confirmDeleteProduct(productId) {
	let result = confirm("Delete this product? This action is permanent.");

	if (result === true) {
		deleteProduct(productId);
	}
}