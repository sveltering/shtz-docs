<script lang="ts">
	export let path;
	let codeDiv: Element;
	import Filenav from '$lib/filenav.svelte';

	function loadFile(event) {
		const { fileName, code, id, filePath } = event.detail;
		console.log(filePath);
		codeDiv.innerHTML = code;
	}
</script>

<div class="code-container">
	<div class="code-column">
		<Filenav codeFiles={path.codeFiles} on:loadFile={loadFile} />
	</div>
	<div class="code-column content">
		<div class="code" bind:this={codeDiv} />
	</div>
</div>

<style>
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
		min-width: 700px;
		flex: auto;
	}
</style>
