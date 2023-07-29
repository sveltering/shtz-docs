<script lang="ts">
	import Split from 'split.js';

	import { minimalSetup, EditorView } from 'codemirror';
	import { Compartment, EditorState } from '@codemirror/state';
	import { svelte } from '@replit/codemirror-lang-svelte';
	import { javascript } from '@codemirror/lang-javascript';
	import { html } from '@codemirror/lang-html';
	import { css } from '@codemirror/lang-css';
	import { json } from '@codemirror/lang-json';
	import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
	import { githubLightInit } from '@uiw/codemirror-theme-github';

	import { afterNavigate, beforeNavigate } from '$app/navigation';
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
	let containerEl;

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
			ts: javascript({
				typescript: true
			}),
			html: html(),
			css: css(),
			json: json()
		};
		fileType.javascript = fileType.js;
		fileType.typescript = fileType.ts;

		let splitt;
		let lastSplitSize = localStorage?.getItem('splitSize') || [40, 60];
		lastSplitSize =
			typeof lastSplitSize === 'string'
				? JSON.parse(lastSplitSize)
				: lastSplitSize;

		let codes = [];
		let editorViews = [];
		let loadTheme = localStorage?.getItem('theme')
			? githubLightInit()
			: vscodeDarkInit();

		let editorTheme = new Compartment();
		const changeTheme = function () {
			loadTheme = localStorage?.getItem('theme')
				? vscodeDarkInit()
				: githubLightInit();
			for (let i = 0, iLen = codes.length; i < iLen; i++) {
				editorViews[i].dispatch({
					effects: editorTheme.reconfigure(loadTheme)
				});
			}
		};

		beforeNavigate(function () {
			editorViews.forEach((view) => view?.destroy());
			editorViews = [];
			document.body.removeEventListener('changeTheme', changeTheme);
		});
		let firstLoad = true;
		afterNavigate(function () {
			pageKey = path.path;
			window.document.title = meta?.title || 'SHTZ docs';
			if (!firstLoad && containerEl) {
				containerEl.scrollIntoView();
			}
			firstLoad = false;
			if (!codeEl) {
				splitt?.destroy();
				splitt = null;
			}
			if (codeEl && !splitt) {
				splitt = Split(['#split-1', '#split-2'], {
					sizes: lastSplitSize,
					onDragEnd(sizes) {
						lastSplitSize = sizes;
						localStorage?.setItem('splitSize', JSON.stringify(lastSplitSize));
					}
				});
			}
			if (!mdEl) {
				return;
			}
			document.body.addEventListener('changeTheme', changeTheme);
			codes = mdEl.querySelectorAll('pre code');

			for (let i = 0, iLen = codes.length; i < iLen; i++) {
				const mdCodeEl = codes[i];
				const codeText = mdCodeEl.innerText;

				const classNameSplit = mdCodeEl.className.split(/(language-|\s+)/);
				const langClassIndex = classNameSplit.indexOf('language-');
				const langKeyIndex =
					langClassIndex === -1 ? undefined : langClassIndex + 1;
				const language = fileType?.[classNameSplit?.[langKeyIndex]];
				if (!language) {
					mdCodeEl.classList.add('wrap');
					continue;
				}

				mdCodeEl.innerHTML = '';
				const extensions = [
					editorTheme.of(loadTheme),
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
				editorViews.push(new EditorView({ parent: mdCodeEl, state }));
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

	let openAll;
	$: if (meta?.open) {
		openAll = meta?.open
			.split(',')
			.map((path: string) => path?.trim()?.split('/'));
	} else {
		openAll = undefined;
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

<div class="container" bind:this={containerEl}>
	<div class="column nav">
		<Navigator {allPaths} wayToPath={[...paths]} {baseHref} />
	</div>
	<div class="content column">
		<div
			class="md markdown-body"
			class:max100={!path?.codeFiles}
			bind:this={mdEl}
			id="split-1"
		>
			{@html content}
			<FooterNavigator
				paths={[...paths]}
				{pathsStore}
				{pathsInOrder}
				{baseHref}
			/>
		</div>

		{#if path.codeFiles}
			<div class="code" bind:this={codeEl} id="split-2">
				{#key pageKey}
					<Code {path} openAll={[...(openAll || [])]} />
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
		min-width: 300px;
		padding: 10px;
		margin-right: 10px;
		font-weight: 300;
	}
	:global(.container .column.content .md pre code.wrap) {
		word-wrap: break-word;
		white-space: break-spaces;
	}
	.container .column.content .md.max100 {
		width: 100%;
	}
	.container .column.content .code {
		background: #111;
		position: sticky;
		top: 0px;
		width: 100%;
		overflow-x: scroll;
		min-width: 600px;
		font-size: 0.7rem;
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
			min-width: 100%;
		}
		.container .column.content .code {
			height: auto !important;
			overflow-x: initial;
			min-width: 100%;
		}

		:global(.gutter) {
			display: none;
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
	@media (max-width: 620px) {
		.container .column.nav {
			display: none;
		}
		.container .column.content .md {
			min-width: 100%;
		}
	}

	:global(.gutter) {
		background-color: #717171;

		background-repeat: no-repeat;
		background-position: 50%;
		width: 10px;
		height: 100vh;
		position: sticky;
		top: 0px;
		margin-right: 10px;
		cursor: col-resize;
	}

	:global(.gutter:hover) {
		background-color: #a1a1a1;
	}
	:global(.gutter:active) {
		background-color: #e1e1e1;
	}
	:global(body.light .gutter:active) {
		background-color: #dbdbdb;
	}

	:global(body.light) {
		background-color: #f6f6f6;
	}

	:global(.markdown-body code .cm-editor) {
		background-color: transparent !important;
	}
</style>
