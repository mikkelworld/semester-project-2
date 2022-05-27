import { baseUrl } from "./settings/api.js";
import { getFeaturedProducts, getProductImageUrl } from "./utils/productUtils.js";
import createAccountNav from "./components/header.js";

// Change the nav based on user auth status
createAccountNav();

// Get wrapper for hero image element
const heroBanner = document.querySelector(".hero-banner-image-wrapper");

const mainElement = document.querySelector("main");

(async function () {
	try {
		const response = await fetch(baseUrl + "/home");
		const json = await response.json();

		// Create image element using data from API
		var image = document.createElement("img");
		image.className = "hero-banner-image";
		image.src = baseUrl + json.hero_banner.url;
		image.alt = json.hero_banner_alt_text;
		image.height = "600";
		image.width = "1200";
		// Add image to page
		heroBanner.prepend(image);
		// Animate image when loaded
		image.addEventListener('load', (event) => {
			image.style.transform = "scale(1)";
			image.style.opacity = 1;
		});

		const featuredProducts = await getFeaturedProducts();

		featuredProducts.forEach(product => {
			createFeaturedProduct(product);
		});

	} catch (error) {
		console.error(error);
	}
})();

// Creates a section for the provided featured product
function createFeaturedProduct(product) {
	// Get the image URL
	const productImageUrl = getProductImageUrl(product);
	// Create the element
	const featuredSection = document.createElement("section");
	featuredSection.className = "featured-product";
	featuredSection.innerHTML = `<div class="container">
		<div class="row">
			<div class="featured-product-image-wrapper col-12 col-md-6">
				<img src="${productImageUrl}" alt="${product.title}">
			</div>
			<div class="featured-product-details col-12 col-md-6">
				<h2>${product.title}</h2>
				<h4 class="mb-4">$${product.price}</h4>
				<p>${product.description}</p>
				<a href="./product.html?id=${product.id}" class="btn btn-outline-primary btn-lg mt-4">View product</a>
			</div>
		</div>
	</div>`;

	// Add it to the page
	mainElement.appendChild(featuredSection);
}