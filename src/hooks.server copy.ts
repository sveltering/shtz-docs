import type { Handle } from '@sveltejs/kit';

let cache: any = global?.responseCache || false;
if (!cache) {
	global.responseCache = cache = {};
}

export const handle: Handle = async ({ event, resolve }) => {
	const { url } = event;

	const key = url.pathname;

	let cached = cache?.[key];
	if (!cached?.body) {
		const response = await resolve(event);

		cached = Object.fromEntries(response.headers.entries());
		cached.body = await response.text();

		if (response.status === 200) {
			cache[key] = cached;
		}
	}

	const { body, ...headers } = cached;
	return new Response(body, { headers: new Headers(headers) });
};
