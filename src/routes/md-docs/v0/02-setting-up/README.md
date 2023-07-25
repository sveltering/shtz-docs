---meta
title: Setting up shtz
---

# Setting Up

### Create setup files in terminal [OR manual setup](#create-setup-files-manually)
Open terminal at the root dir of your app.

```bash
cd src && touch hooks.server.ts && mkdir -p trpc && cd "$_" && touch init.ts hooks.ts browserClients.ts serverClients.ts && mkdir -p routes && cd "$_" && touch index.ts && cd ../../../
```

```typescript
import { TRPCHook } from './trpc/hooks';

export async function handle({ event, resolve }) {
	const TRPCResponse = await TRPCHook(event);
	if (TRPCResponse) {
		return TRPCResponse;
	}
	return await resolve(event);
}
```


```svelte
<script lang="ts">
	import { writable } from 'svelte/store';

	console.clear();
	let hi = {
		hi: 1
	};

	let store = writable(hi);

	$: console.log(hi);

	setTimeout(() => {
		hi.hello = 'HELLO';
		store.update((val) => val);
	}, 3000);
</script>
```

### Create setup files manually
Follow the files structure in the code section.