<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	// $: section = $page.params.sections.split('/');
	// console.log(data.paths);

	const warnings = data.warnings;
	const meta = data.meta;

	if (warnings.length) {
		for (let i = 0, iLen = data.warnings.length; i < iLen; i++) {
			console.log(...data.warnings[i]);
		}
	}

	if (browser) {
		console.log(data);
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

{#if warnings.length}
	<h1>Warnings: check console for error.</h1>
{/if}
{@html data.content}
