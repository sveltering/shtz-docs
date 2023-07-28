---meta
title: $multiple store
open: src/trpc/routes/db/index.ts, src/trpc/browserClient.ts
---

# $multiple store

Let's step it up again!

As you can see in th example we have create a new `db` route in `src/trpc/routes/db`

Open the following files
- `src > trpc > routes > index.ts` \
  Here we have added the `db` route to our original route
- `src > routes > store > multiple > +page.server.ts` \
  Here we are query the `getList` procedure on our new `db` route
- `src > routes > store > multiple > +page.svelte` \
  More on this below

## `+page.svelte`

```typescript
let list = storeClient.db.addToList.mutate.$multiple({
    prefill: data.prefill,
    loading: true,
    unique: function (input, response) {
        return input ? input : response;
    }
});
```

As you can see on this page we create a multiple store with the following options
- `prefill` - where we provide the data returned from the `+page.server.ts` load function
- `loading` - multiple stores have multiple responses of which any, all or none could be loading.
  This loading adds an extra `loading` property on the store which is true if at least 1 response is still loading.
- `unique` - is a function to detrmine whether an input or response is unique and to replace an older unique value.

And if you check the page source, you'll see the prefill data get's rendered!
![demo!](/img/06.gif)