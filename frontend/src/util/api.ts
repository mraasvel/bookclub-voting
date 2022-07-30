const VITE_WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL;
// uri == "/user"
export async function callApi(uri: string, init?: RequestInit) {
	const URI = `${VITE_WEBSITE_URL}/api${uri}`;
	console.log("api call: ", URI);
	return await fetch(URI, init);
}

// Change this if you need more methods with a JSON body
type MethodWithBody = "POST";

// small wrapper for posting etc
export async function callApiJson(
	uri: string,
	method: MethodWithBody,
	body: Record<string, unknown>
) {
	return await callApi(uri, {
		method: method,
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(body),
	});
}

export default callApi;
