---meta
title: browserClient.ts
desc: Set up the browser client
open: src/trpc/browserClient.ts
---

# browserClient.ts
To call the procedures from the browser we need to set up a client.

There are 4 clients `browserClient`, `storeClient`, `loadClient`, `serverClient`

- `browserClient` \
  Works the same way you would expect the trpc native client to work with 1 differece. \
  The difference being, when the server renders (SSR) `+page.svelte`, no call is made to the procedure and the endpoint returns undefined. \
  This is the default bevhaviour as when SSR occurs, on a native tRPC client the call is still made to the procedure on the server side, but the response is not rendered, and when loaded in the browser the call is made again. \
  Therefore we have an extra wasted call and we could potentially have unwanted behaviour if we have CRUD operations in the procedure. \
  This can be changed by setting the option `browserOnly:false`
- `storeClient` \
  The store client is the most adaptable client as it works as a svelte store for your data. \
  The stores have properties such as `loading`, `error`, `data` which change based on the reuqest state.
  The store can be prefilled with data from both the server side (for SSR) or the client.
- `loadClient` \
  This client is intended to be used in `+page.ts` or `+server.ts` load functions. \
  This client is useful as you can set up `origin` and `bypassOrigin` on the TRPC class \
  So when calls to procedures are made on the server they are through the `bypassOrigin`, and `origin` in the browser
- `serverclient` \
  This client is inteded for use directly on the server e.g. `page.server.ts` or `layout.server.ts` \
  When requests are made on this client, the procedure function is invoked directly on the server and there is no HTTP request.

## Creating the browserClient

In the example we import the `browserClientCreate` function to which we add the `Router` type imported from `hooks.ts` as a generic.

We also set the `url` option which is currently as `localhost:5173/trpc`, but you will need to change as appropriate and also consider dev/prod environment.

We then export the `browserClient` to be used in our `+page.svelte` files.

We also export the `ProcedureReturnType` utility type to infer prodecure return types.
