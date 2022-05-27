import { isUserSignedIn, signOut } from "../utils/auth.js";
import { updateCart } from "../utils/cartUtils.js";

export default function createAccountNav() {
	// Set the number of items in the cart nav item
	updateCart();

	// Do nothing if we're not logged in
	if (!isUserSignedIn())
		return;

	// Change nav if we are logged in
	const accountNavItem = document.querySelector("#navMyAccount");
	accountNavItem.classList.add("dropdown");
	accountNavItem.innerHTML = `<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">My account</a>
		<ul class="dropdown-menu">
			<li><a class="dropdown-item" href="./create.html">Add product</a></li>
			<li>
				<hr class="dropdown-divider">
			</li>
			<li>
				<a class="dropdown-item" href="#" id="navSignOut">Sign out</a>
			</li>
		</ul>`;

	// Get the newly created sign out button
	const signOutButton = document.querySelector("#navSignOut");

	// Add event listener for sign out button
	signOutButton.addEventListener("click", function () {
		signOut();
	});
};