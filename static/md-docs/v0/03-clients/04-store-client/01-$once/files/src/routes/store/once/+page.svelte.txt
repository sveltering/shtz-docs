<script lang="ts">
	import { storeClient } from '$trpc/browserClients';
	let welcome = storeClient.welcome.query.$once();
</script>

{#if $welcome.loading}
	Loading...
{:else if $welcome.success}
	{$welcome.data}
{:else}
	<h1>Welcome to SvelteKit</h1>
{/if}
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
