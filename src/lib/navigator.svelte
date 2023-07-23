<script lang="ts">
	export let wayToPath: any, allPaths: any, baseHref: any;
	$: currentSlug = wayToPath?.shift();
	$: currentLevel = allPaths?.paths || [];
</script>

{#each Object.entries(currentLevel) as [slug, paths]}
	{@const dir = allPaths.paths[slug]}
	{@const isCurrent = currentSlug === slug}

	<div class="dir">
		{#if isCurrent}
			<span class="name current">{dir.title}</span>
		{:else}
			<a href={baseHref + '/' + slug}><span class="name">{dir.title}</span></a>
		{/if}
		{#if Object.keys(dir?.paths || {}).length}
			<div class="childDir">
				<svelte:self allPaths={dir} wayToPath={[...wayToPath]} baseHref={baseHref + '/' + slug} />
			</div>
		{/if}
	</div>
{/each}

<style>
	.dir .name {
		font-weight: bold;
	}
	.childDir {
		margin-left: 10px;
	}
</style>
