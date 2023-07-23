<script lang="ts">
	import { page } from '$app/stores';
	import Filenav from '$lib/filenav.svelte';
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

	function loadFile(event) {
		const { fileName, code } = event.detail;
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

<Navigator {allPaths} wayToPath={[...paths]} {baseHref} />

{#if warnings?.length}
	<h1>Warnings: check console for error.</h1>
{/if}

{@html content}
{#if path.codeFiles}
	<Filenav codeFiles={path.codeFiles} on:loadFile={loadFile} />
{/if}

<div class="code" bind:this={codeDiv} />
