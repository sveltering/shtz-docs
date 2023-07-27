---meta
title: Setting up shtz
open: src/trpc/routes/index.ts
---

# Setting Up

## Create required files

### Create setup files in terminal [OR manual setup](#create-setup-files-manually)
Open terminal at the root dir of your app and run the command below to create the files in one go.

```bash
cd src && touch hooks.server.ts && mkdir -p trpc && cd "$_" && touch init.ts hooks.ts browserClients.ts serverClients.ts && mkdir -p routes && cd "$_" && touch index.ts && cd ../../../
```

### Create setup files manually
Follow the files structure in the example section.


## Aliases (optional, but recommended)

Aliases are recommended as it make things a lot easier in the long run.

Open `./svelte.config.js`

Add the alias option like below to link `$trpc` to the `./src/trpc` directory where you will keep all the setup files and routes.

```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$trpc: './src/trpc'
		}
	}
};

export default config;

```

### Alias in `./tsconfig.json` (optional)

Even though it's not required as svelte handles the alias in the svelte config file, I find I still have issues when it comes to automatically including packages in my editor, so I add it in the tsconfig file too for safe measure.

```json
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true,
		"paths": {
			"$trpc": ["./src/trpc"],
			"$trpc/*": ["./src/trpc/*"],
		}
	}
}
```