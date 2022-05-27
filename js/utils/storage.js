// Sets the value of a specific key in localStorage
export function setKeyVal(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

// Returns a specific key from localStorage
export function getKeyVal(key) {
	const value = localStorage.getItem(key);

	if (!value)
		return [];
	else
		return JSON.parse(value);
}

// Returns the login token
export function getToken() {
	return getKeyVal("token");
}