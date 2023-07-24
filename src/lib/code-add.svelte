<script lang="ts">
	import { basicSetup, EditorView } from 'codemirror';
	import { EditorState } from '@codemirror/state';

	import { svelte } from '@replit/codemirror-lang-svelte';
	import { javascript } from '@codemirror/lang-javascript';
	import { html } from '@codemirror/lang-html';
	import { css } from '@codemirror/lang-css';

	import { json } from '@codemirror/lang-json';
	import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';

	import { onMount } from 'svelte';

	export let details;
	export let codeEl;

	onMount(function () {
		if (typeof window !== 'undefined' && typeof window.document === 'object') {
			const fileType = {
				svelte: svelte(),
				js: javascript(),
				html: html(),
				css: css(),
				json: json()
			};
			fileType.ts = fileType.js;

			const state = EditorState.create({
				doc: details.code,
				extensions: [
					vscodeDarkInit(),
					basicSetup,
					fileType[details.fileName.split('.').pop()]
				]
			});

			new EditorView({
				parent: codeEl,
				state
			});
		}
	});
</script>

<pre><code bind:this={codeEl} /></pre>

<style>
	code {
		font-size: 14px;
	}
</style>
