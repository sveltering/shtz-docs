<script lang="ts">
	import { basicSetup, EditorView } from 'codemirror';
	import { EditorState } from '@codemirror/state';

	import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Code from '$lib/code.svelte';
	import Header from '$lib/header.svelte';
	import Navigator from '$lib/navigator.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let data: PageData;

	let mdEl;
	let codeEl;

	$: ({ warnings, meta, content, allPaths, paths, path } = data);

	if (warnings?.length) {
		for (let i = 0, iLen = warnings.length; i < iLen; i++) {
			console.log(...warnings[i]);
		}
	}

	const baseHref = $page.url.pathname.split('/').slice(0, 3).join('/');

	afterNavigate(function () {
		if (!browser) {
			return;
		}
		document.title = meta?.title || 'SHTZ docs';
		if (!mdEl) {
			return;
		}
		console.log(codeEl);
		const codes = mdEl.querySelectorAll('code');
		for (let i = 0, iLen = codes.length; i < iLen; i++) {
			const text = codes[i].innerText;
			codes[i].innerHTML = '';

			const state = EditorState.create({
				doc: text,
				extensions: [vscodeDarkInit(), basicSetup, EditorView.lineWrapping]
			});

			new EditorView({
				parent: codes[i],
				state
			});
		}
		resizeCodeElHeight();
	});
	function resizeCodeElHeight() {
		if (!codeEl) {
			return;
		}
		// codeEl.style.height =
		// 	window.innerHeight - codeEl.getBoundingClientRect().top + 'px';

		codeEl.style.height = window.innerHeight + 'px';
	}
</script>

<svelte:window on:resize={resizeCodeElHeight} />

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
	<div class="column nav">
		<Navigator {allPaths} wayToPath={[...paths]} {baseHref} />
	</div>
	<div class="content column">
		<div class="md" bind:this={mdEl}>
			{@html content}
		</div>

		{#if path.codeFiles}
			<div class="code" bind:this={codeEl}>
				<Code {path} />
			</div>
		{/if}
	</div>
</div>

<style>
	.container {
		min-width: 0;
		max-width: 100%;
		width: 100%;
		padding: 10px 10px 0 10px;
		display: inline-flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: flex-start;
		align-items: flex-start;
	}
	.container .column {
		padding: 10px 10px 0 10px;
	}
	.container .column.nav {
		white-space: nowrap;
		display: table;
	}
	.container .column.content {
		flex-grow: 1;
		display: inline-flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: flex-start;
		align-items: flex-start;
	}
	.container .column.content .md {
		min-width: 600px;
		padding: 10px;
	}
	.container .column.content .code {
		background: #111;
		position: sticky;
		top: 0px;
		width: 100%;
		overflow-x: scroll;
	}
	@media (max-width: 1400px) {
		.container .column.content {
			flex-direction: column;
			align-items: initial;
		}
		.container .column.content > div {
			flex-grow: 1;
			margin-bottom: 30px;
		}

		.container .column.content .code {
			height: auto !important;
			overflow-x: initial;
		}
	}
	@media (min-width: 1800px) {
		.container .column.content .md {
			min-width: 700px;
			padding: 10px;
		}
	}
	@media (min-width: 2000px) {
		.container .column.content .md {
			min-width: 900px;
			padding: 10px;
		}
	}
</style>
