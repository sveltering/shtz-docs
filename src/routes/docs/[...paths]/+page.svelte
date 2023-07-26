<script lang="ts">
	import { minimalSetup, EditorView } from 'codemirror';
	import { EditorState } from '@codemirror/state';
	import { svelte } from '@replit/codemirror-lang-svelte';
	import { javascript } from '@codemirror/lang-javascript';
	import { html } from '@codemirror/lang-html';
	import { css } from '@codemirror/lang-css';
	import { json } from '@codemirror/lang-json';
	import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Code from '$lib/code.svelte';
	import Header from '$lib/header.svelte';
	import Navigator from '$lib/navigator.svelte';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import FooterNavigator from '$lib/footer-navigator.svelte';

	export let data: PageData;

	let mdEl;
	let codeEl;

	let { warnings, meta, content, allPaths, paths, path } = data;
	$: ({ warnings, meta, content, paths, path } = data);

	if (warnings?.length) {
		for (let i = 0, iLen = warnings.length; i < iLen; i++) {
			console.log(...warnings[i]);
		}
	}

	const baseHref = $page.url.pathname.split('/').slice(0, 3).join('/');
	let pageKey = path.path;
	if (browser) {
		const fileType = {
			svelte: svelte(),
			js: javascript(),
			html: html(),
			css: css(),
			json: json()
		};
		fileType.ts = fileType.js;
		fileType.javascript = fileType.js;
		fileType.typescript = fileType.js;

		afterNavigate(function () {
			pageKey = path.path;
			window.document.title = meta?.title || 'SHTZ docs';
			if (!mdEl) {
				return;
			}
			const codes = mdEl.querySelectorAll('code');
			for (let i = 0, iLen = codes.length; i < iLen; i++) {
				const mdCodeEl = codes[i];
				const codeText = mdCodeEl.innerText;

				const classNameSplit = mdCodeEl.className.split(/(language-|\s+)/);
				const langClassIndex = classNameSplit.indexOf('language-');
				const langKeyIndex =
					langClassIndex === -1 ? undefined : langClassIndex + 1;
				const language = fileType?.[classNameSplit?.[langKeyIndex]];
				mdCodeEl.innerHTML = '';
				const extensions = [
					vscodeDarkInit(),
					minimalSetup,
					EditorView.lineWrapping
				];
				if (language) {
					extensions.push(language);
				}
				const state = EditorState.create({
					doc: codeText,
					extensions
				});
				const view = new EditorView({ parent: mdCodeEl, state });
			}
			resizeCodeElHeight();
		});
	}
	function resizeCodeElHeight() {
		if (!codeEl) {
			return;
		}
		codeEl.style.height = window.innerHeight + 'px';
	}

	const pathsStore: any = {};
	let pathsInOrder: any[] = [];

	function loadPaths(paths) {
		for (let key in paths) {
			pathsInOrder.push(paths[key].url);
			pathsStore[paths[key].url] = {
				url: paths[key].url,
				title: paths[key].title,
				first: paths[key].isFirst
			};
			loadPaths(paths[key].paths);
		}
	}
	loadPaths(allPaths?.paths);

	let open;
	$: if (meta?.open) {
		open = meta?.open?.split('/');
	} else {
		open = undefined;
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
		<div class="md markdown-body" bind:this={mdEl}>
			{@html content}
			<FooterNavigator
				paths={[...paths]}
				{pathsStore}
				{pathsInOrder}
				{baseHref}
			/>
		</div>

		{#if path.codeFiles}
			<div class="code" bind:this={codeEl}>
				{#key pageKey}
					<Code {path} {open} />
				{/key}
			</div>
		{/if}
	</div>
</div>

<style>
	.container {
		min-width: 0;
		max-width: 100%;
		width: 100%;
		padding: 5px 5px 0 5px;
		display: inline-flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: flex-start;
		align-items: flex-start;
	}
	.container .column {
		padding: 5px 5px 0 5px;
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
		min-width: 440px;
		max-width: 600px;
		padding: 10px;
		margin-right: 10px;
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

		.container .column.content .md {
			margin-right: 0px;
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
