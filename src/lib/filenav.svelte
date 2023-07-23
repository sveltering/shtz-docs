<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let codeFiles: any[];

	const dispatch = createEventDispatcher();

	function loadFile(fileName: string, code: string) {
		return function () {
			dispatch('loadFile', {
				fileName,
				code
			});
		};
	}
	function nested(event) {
		dispatch('loadFile', event.detail);
	}
</script>

{#each codeFiles as file}
	{#if file?.file}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span class="fileName" on:dblclick={loadFile(file.file, file.content)}>{file.file}</span><br />
	{/if}
	{#if file?.dir}
		<div class="childDir">
			<span class="dirName">{file.dir}</span><br />
			<div class="files">
				<svelte:self codeFiles={file.files} on:loadFile={nested} />
			</div>
		</div>
	{/if}
{/each}

<style>
	.childDir .files {
		margin-left: 10px;
	}
</style>
