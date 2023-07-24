<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Filenav from '$lib/filenav.svelte';
	import Header from '$lib/header.svelte';
	import Navigator from '$lib/navigator.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ warnings, meta, content, allPaths, paths, path } = data);

	if (warnings?.length) {
		for (let i = 0, iLen = warnings.length; i < iLen; i++) {
			console.log(...warnings[i]);
		}
	}

	const baseHref = $page.url.pathname.split('/').slice(0, 3).join('/');

	let codeDiv: Element;
	afterNavigate(function () {
		document.title = meta?.title || 'SHTZ docs';
		codeDiv.innerHTML = '';
	});

	function loadFile(event) {
		const { fileName, code, id } = event.detail;
		console.log(id);
		codeDiv.innerHTML = code;
	}
</script>

<svelte:head>
	{#if meta?.title}
		<title>{meta.title}</title>
	{/if}
	{#if meta?.description}
		<meta name="description" content={meta.description} />
	{/if}
</svelte:head>

<Header />

{#if warnings?.length}
	<h1>Warnings: check console for error.</h1>
{/if}
<div class="container">
	<div class="column">
		<Navigator {allPaths} wayToPath={[...paths]} {baseHref} />
	</div>
	<div class="column content">
		{@html content}
	</div>

	{#if path.codeFiles}
		<div class="column">
			<div class="code-container">
				<div class="code-column">
					<Filenav codeFiles={path.codeFiles} on:loadFile={loadFile} />
				</div>
				<div class="code-column content">
					<div class="code" bind:this={codeDiv} />
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.container {
		padding: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: flex-start;
		align-items: flex-start;
	}
	.container .column {
		padding: 10px;
	}
	.container .column.content {
		flex: auto;
	}
	.code-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: flex-start;
		align-items: flex-start;
	}
	.code-container .code-column {
		min-width: 200px;
		padding: 10px;
	}
	.code-container .code-column.content {
		flex: auto;
	}
</style>
