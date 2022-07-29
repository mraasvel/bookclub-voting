const VITE_API_URL = import.meta.env.VITE_API_URL;
// uri == "/user"
export async function callApi(uri: string, init?: RequestInit) {
	return await fetch(`${VITE_API_URL}/${uri}`, init);
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
