---meta
title: Store client
open: src/trpc/browserClient.ts
---

# Store client
> Stores only support `query` and `mutate` procedures

The store client is a client which returns a svelte store which is reactive based on the request state.

Like `browserClient`, no calls are made to procedures on the server. However, unlike `browserClient` you can prefill the store with data using `load` functions, so your page will still SSR!

With minimal options, the store will have the booleans `loading`, `success`, as well ass `error` which will be `false | Error` and finally `data`  as `undefined` or your response data.

There are 4 methods in the store client, 3 of which are store types.

There is `call`, `$once`, `$many`, `$multiple`, and as you've probably guessed the methods that return a store start with `$`.

- `call` - works the exact same way the `browserClient` works, no need to import more than 1 client.
- `$once` - can only be called once - used in situations where you don't need to update state
- `$many` - can be called many times - when called it replaces the previous data.
- `$multiple` - can be called many times, but responses are kept in an array.

## Setting it up

In the `browserClient.ts` file we will create the store client.

