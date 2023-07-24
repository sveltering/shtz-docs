<script lang="ts">
	export let wayToPath: any,
		allPaths: any,
		baseHref: any,
		first: boolean = true;
	$: currentSlug = wayToPath?.shift();
	$: currentLevel = allPaths?.paths || [];
</script>

{#each Object.entries(currentLevel) as [slug, paths]}
	{@const isCurrent = currentSlug === slug && !wayToPath.length}

	<div class="dir" class:first>
		{#if isCurrent}
			<span class="name current">{paths.title}</span>
		{:else}
			<a href={baseHref + '/' + slug} class="name"><span>{paths.title}</span></a>
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

<style>
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
		font-weight: 200;
		color: #fff;
	}

	.dir.first > .name {
		display: block;
		text-transform: uppercase;
		letter-spacing: 0.2rem;
		font-weight: 700;
		margin: 10px 0;
	}
</style>
