---meta
title: Hooks
desc: Set up hooks.ts
open: src/hooks.server.ts, src/trpc/hooks.ts
---

# hooks.ts
Now we set up hooks to capture and route all trpc requests made to the server

## Creating our hook

In the example you can see we import `t` our TRPC class object we created in `init.ts` and we also import our routes

We then create a `Router` type for our routes which will be used later when we create our clients (clients are how we call the endpoints from frontend/backend).

We also create our handle hook which contains the magic of routing any requests to our chosen `/path` to the procedures in our routes.


## Setting up the hook

Now open `src > hooks.server.ts`

Here we import the `handleHook` function we created in the `hooks.ts` file and we use it to capture any trpc requests.

If the request is to a trpc endpoint we then return the response.