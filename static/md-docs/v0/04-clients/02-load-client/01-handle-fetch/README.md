---meta
title: Handle fetch
open: src/hooks.server.ts, src/trpc/init.ts, src/trpc/hooks.ts
---

# handle fetch

 `load` functions in `+page.ts` and `+layout.ts` run twice. First on the backend when the request is made, and again on the front end.

 If we set the url for our load client as `http://mypublicdomain.com`, on the backend we are still making the call to the url `http://mypublicdomain.com`, which is kinda wasteful!

We can avoid routing a DNS for `http://mypublicdomain.com` on the backend and call from our server directly.

## Setting it up

In the hooks file we have added `export const handlefetchHook = t.handleFetchCreate();`.

This will error, so we need to add our `origin` and `bypassOrigin` to our TRPC class in the `src > trpc > init.ts` file. 

We also need to import `handlefetchHook` and implement it in our `hooks.server.ts` file as shown in the example.

We have used the same `origin` and `bypassOrigin` in this example as the application is in a development environment.

However, in production this would looks something like the following

```typescript
export const t = new TRPC({
	path: '/trpc',
	context: async function (event) {
		return {
			welcome: 'Hello and welcome!'
		};
	},
	origin: 'http://mypublicdomain.com',
	bypassOrigin: 'http://my.private.ip.address.or.domain'
});
```
