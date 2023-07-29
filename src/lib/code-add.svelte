<script lang="ts">
	import { basicSetup, EditorView } from 'codemirror';
	import { Compartment, EditorState } from '@codemirror/state';
	import { svelte } from '@replit/codemirror-lang-svelte';
	import { javascript } from '@codemirror/lang-javascript';
	import { html } from '@codemirror/lang-html';
	import { css } from '@codemirror/lang-css';
	import { json } from '@codemirror/lang-json';
	import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
	import { githubLightInit } from '@uiw/codemirror-theme-github';

	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let details;
	export let codeEl;

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

		let editorView;
		let loadTheme = document.body.classList.contains('light');
		let editorTheme = new Compartment();
		const changeTheme = function () {
			loadTheme = document.body.classList.contains('light');
			editorView.dispatch({
				effects: editorTheme.reconfigure(
					loadTheme ? githubLightInit() : vscodeDarkInit()
				)
			});
		};
		onMount(function () {
			const state = EditorState.create({
				doc: details.code,
				extensions: [
					editorTheme.of(loadTheme ? githubLightInit() : vscodeDarkInit()),
					basicSetup,
					fileType[details.fileName.split('.').pop()],
					EditorView.lineWrapping
				]
			});
			editorView = new EditorView({ parent: codeEl, state });
			document.body.addEventListener('changeTheme', changeTheme);
		});
		onDestroy(function () {
			document.body.removeEventListener('changeTheme', changeTheme);
		});
	}
</script>

<pre><code bind:this={codeEl} /></pre>

<style>
	code {
		font-size: 0.7rem;
	}
</style>
