import type { Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';

let cacheEnabled = dev ? false : true;

let cache: any = dev ? global?.responseCache || false : false;
if (!cache) {
	cache = {};
	if (dev) {
		global.responseCache = cache;
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	const { url } = event;

	const key = url.pathname;

	let cached = cache?.[key];
	if (!cached?.body) {
		const response = await resolve(event);

		cached = Object.fromEntries(response.headers.entries());
		cached.body = await response.text();

		if (cacheEnabled && response.status === 200) {
			cache[key] = cached;
		}
	}

	const { body, ...headers } = cached;
	return new Response(body, { headers: new Headers(headers) });
};
