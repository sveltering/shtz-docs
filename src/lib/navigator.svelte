<script lang="ts">
	export let wayToPath: any,
		allPaths: any,
		baseHref: any,
		first: boolean = true;
	$: currentSlug = wayToPath?.shift();
	$: currentLevel = allPaths?.paths || [];
</script>

{#each Object.entries(currentLevel) as [slug, paths], index}
	{@const isCurrent = currentSlug === slug && !wayToPath.length}
	{@const displayIndex = index + 1}

	<div class="dir" class:first>
		{#if isCurrent}
			{#if first}
				<span class="name current">{paths.title}</span>
			{:else}
				<span class="name current">{displayIndex}. {paths.title}</span>
			{/if}
		{:else if first}
			<a href={baseHref + '/' + slug} class="name"><span>{paths.title}</span></a
			>
		{:else}
			<a href={baseHref + '/' + slug} class="name"
				><span>{displayIndex}. {paths.title}</span></a
			>
		{/if}
		{#if Object.keys(paths?.paths || {}).length}
			<div class="childDir">
				<svelte:self
					allPaths={paths}
					wayToPath={[...wayToPath]}
					baseHref={baseHref + '/' + slug}
					first={false}
				/>
			</div>
		{/if}
	</div>
{/each}

{#if first}
	<div class="links">
		<a href="https://github.com/sveltering/shtz" target="_blank"
			><i class="icon github-icon svelte-1bevz0d" />Github</a
		>
		<a href="https://www.npmjs.com/package/@sveltering/shtz" target="_blank"
			><i class="icon npm-icon svelte-1bevz0d" />npm</a
		>
	</div>
{/if}

<style>
	.dir {
		line-height: 1.3rem;
		margin: 10px 0;
	}
	.dir .name {
		font-weight: bold;
	}
	.dir:not(.first) .childDir {
		margin-left: 10px;
	}

	.dir.first {
		margin-bottom: 20px;
	}

	.dir.first .name {
		letter-spacing: 0.1rem;
		font-weight: 400;
		color: #fff;
	}

	.dir .name.current {
		color: rgb(182, 64, 22);
		text-decoration: underline;
		text-underline-offset: 0.3rem;
	}
	.dir.first > .name {
		display: block;
		text-transform: uppercase;
		letter-spacing: 0.2rem;
		font-weight: 900;
		margin: 5px 0 10px 0;
	}
	.dir.first:first-of-type {
		margin-top: 0;
	}
	.links {
		text-align: center;
	}
	.links a {
		font-size: 1.2rem;
	}
	:global(body.light) .dir.first .name {
		color: #000;
	}
	:global(body.light) .dir .name.current {
		color: rgb(182, 64, 22);
	}
</style>
