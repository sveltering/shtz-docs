---meta
title: browserClient.ts
desc: Set up the browser client
open: src/trpc/browserClient.ts
---

# browserClient.ts
To call the procedures from the browser we need to set up a client.


## Creating the browserClient

In the example we import the `browserClientCreate` function to which we add the `Router` type imported from `hooks.ts` as a generic.

We also set the `url` option which is currently as `localhost:5173/trpc`, but you will need to change as appropriate and also consider dev/prod environment.

We then export the `browserClient` to be used in our `+page.svelte` files.

We also export the `ProcedureReturnType` utility type to infer prodecure return types.
