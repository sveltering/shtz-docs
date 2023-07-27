---meta
title: $once store
open: src/routes/store/once/+page.svelte
---

# $once store

This example is simple.

If the query procedure has input you can also add that to the $once call e.g. and you get full typesafety and autocomplete.

```typescript
let welcome = storeClient.welcome.query.$once({
	name:"Yusaf"
});
```

Next we'll include the name input and try it with `$many`!