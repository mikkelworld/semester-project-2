import { baseUrl } from "../settings/api.js";

// Returns the image URL of a product, regardless of if it was uploaded or linked
export function getProductImageUrl(product) {
	if (product.image != null && product.image.url != null)
		return baseUrl + product.image.url;
	else if (product.image_url != null)
		return product.image_url;
	else
		return "./images/no-image.jpg"; // We don't allow adding products without images, but better safe than sorry
}

// Returns a single product from the API
export async function getSingleProduct(productId) {

	try {
		const response = await fetch(baseUrl + `/products/${productId}`);
		const json = await response.json();

		return json;
	} catch (error) {
		console.error(error);
	}

	return null;
}

// Returns the products marked as featured
export async function getFeaturedProducts() {
	try {
		const response = await fetch(baseUrl + "/products");
		const json = await response.json();

		// Filter the product list and return
		const featuredProducts = json.filter(product => product.featured === true);
		return featuredProducts;
	} catch (error) {
		console.error(error);
	}
}