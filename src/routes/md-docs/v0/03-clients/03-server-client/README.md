---meta
title: Sever Client
open: src/trpc/serverClient.ts
---

# Server client

The server client can be used in place of the load client.

The server client differs from the load client in that your procedure functions are invoked directly, as opposed to making a http request.

If SSR is necessary and you don't want to make http requests just to call your backend from your backend then use the server client over the load client!

It can be used in `+page.server.ts` , `+layout.server.ts` and `+server.ts` files.

This client isn't to be used from the front end (and wouldn't work if you tried!)

The procedure will only be called once, however if you use[`invalidate`](https://kit.svelte.dev/docs/modules#$app-navigation-invalidate) or [`invalidateAll`](https://kit.svelte.dev/docs/modules#$app-navigation-invalidateAll), the procedure will be called again.

## Setting it up

In the `serverClient.ts` file we create the server client.

If you open `src > routes > server > +page.server.ts` and `src > routes > server > +page.svelte`, you will see how use the server client.

