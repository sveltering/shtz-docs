<script lang="ts">
	import { basicSetup, EditorView } from 'codemirror';
	import { EditorState } from '@codemirror/state';

	import { svelte } from '@replit/codemirror-lang-svelte';
	import { javascript } from '@codemirror/lang-javascript';
	import { html } from '@codemirror/lang-html';

	import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';

	import { onMount } from 'svelte';

	export let details;
	export let codeEl;

	const fileType = {
		svelte: svelte(),
		js: javascript(),
		html: html(),
		css: 'css'
	};
	fileType.ts = fileType.js;

	onMount(function () {
		// codeEl.classList.add(
		// 	'language-' + fileType[details.fileName.split('.').pop()]
		// );
		if (typeof window !== 'undefined' && typeof window.document === 'object') {
			const state = EditorState.create({
				doc: details.code,
				extensions: [
					vscodeDarkInit({
						settings: {}
					}),
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
