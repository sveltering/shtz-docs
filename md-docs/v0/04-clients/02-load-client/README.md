---meta
title: Load Client
open: src/routes/load/+page.ts, src/routes/load/+page.svelte, src/trpc/browserClient.ts
---

# The load client

The load client is useful for SSR.

The load client is intended to be used in `load` functions in  `+page.ts` or `+layout.ts` files.

The client is called from both the backend and the front end when a request is made to a page.

## Setting it up
Now let's add a load client to our `browserClient.ts` file.

If you also open `src > routes > load > +page.svelte` and `src > routes > load > +page.ts` you can see how the load client is used. 

And now if you look at the page source your should see the welcome message!
![page source!](/img/05.png)