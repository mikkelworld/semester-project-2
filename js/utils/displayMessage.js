// Creates a customizable alert message in the provided container
export default function displayMessage(type, message, container) {
	// Content we want to put into the container
	var content = `<div class="alert alert-${type}">${message}</div>`;

	// Populate container with content based on the type we provided
	if (typeof (container) === "string") {
		document.querySelector(container).innerHTML = content;
	}
	else if (typeof (container) === "object") {
		container.innerHTML = content;
	}
	else {
		console.error("Unable to create displayMessage for type " + typeof(container));
	}
}