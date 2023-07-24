<script lang="ts">
	import Prism from 'prismjs';
	import 'prismjs/components/prism-bash.js';
	import 'prismjs/components/prism-diff.js';
	import 'prismjs/components/prism-typescript.js';
	import 'prism-svelte';
	import Filenav from '$lib/filenav.svelte';

	export let path;

	let openFiles: any = {};
	let currentId: string = undefined as any as string;
	function loadFile(event: any) {
		const id = event.detail.id;
		if (openFiles?.[id]) {
			currentId = id;
			return;
		}
		openFiles[id] = event.detail;
		currentId = id;
	}
	const fileTypeAliases = { html: 'html5' };
</script>

<h1>The code</h1>
<div class="code-container">
	<div class="code-column nav">
		<Filenav codeFiles={path.codeFiles} on:loadFile={loadFile} />
	</div>

	<div class="code-column content">
		<div class="open-files">
			{#each Object.entries(openFiles) as [id, details]}
				{@const filetype = details.fileName.split('.').pop()}
				{@const fileTypeIcon = fileTypeAliases?.[filetype] || filetype}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="open-file" on:click={() => (currentId = id)} class:open={id === currentId}>
					<i class="icon {fileTypeIcon}-icon" />{details.fileName}
					<span
						class="close-file"
						on:click|stopPropagation={() => {
							delete openFiles[id];
							if (currentId === id) {
								for (let key in openFiles) {
									currentId = key;
									break;
								}
							}
							openFiles = openFiles;
						}}>X</span
					>
				</div>
			{/each}
		</div>
		{#each Object.entries(openFiles) as [id, details]}
			<div class="code-outer" class:show={details.id === currentId}>
				<div class="navigate">
					{#each details.filePath as path, index}
						{#if index === details.filePath.length - 1}
							{@const filetype = path.split('.').pop()}
							{@const fileTypeIcon = fileTypeAliases?.[filetype] || filetype}
							<i class="icon {fileTypeIcon}-icon" />{path}
						{:else}
							{path}&nbsp&gt;&nbsp;
						{/if}
					{/each}
				</div>
				<div class="code">
					<pre><code
							>{@html Prism.highlight(details.code, Prism.languages['svelte'], 'svelte')}</code
						></pre>
				</div>
			</div>
		{/each}
		{#if !Object.keys(openFiles).length}
			<div class="code-outer show">
				<div class="code">
					<pre><code>Nothing Open</code></pre>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.nav {
		background: #111;
	}
	.icon:before {
		width: 20px;
		font-size: 13px;
	}
	.code-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: flex-start;
		align-items: flex-start;
		font-family: monospace;
		tab-size: 40px;
	}
	.code-container .code-column {
		padding: 10px;
		align-self: stretch;
		display: table;
	}
	.code-container .code-column.content {
		flex: auto;
		background: #333;
		padding: 0;
	}
	.code-container .code-column.content .code-outer {
		display: none;
		line-height: 1.3rem;
	}
	.code-container .code-column.content .code-outer .navigate {
		border-bottom: 1px solid #555;
		padding: 10px;
	}
	.code-container .code-column.content .code-outer .code {
		padding: 10px;
	}
	.code-container .code-column.content .code-outer.show {
		display: block;
	}
	.open-files {
		background: #111;
	}
	.open-files .open-file {
		display: inline-block;
		padding: 10px 20px;
		cursor: pointer;
		border-top: 1px solid transparent;
		-webkit-user-select: none; /* Safari */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none; /* Standard */

		white-space: nowrap;
	}
	.open-files .open-file.open {
		background: #333;
		border-top: 1px solid rgb(13, 13, 204);
	}
	.open-files .open-file .close-file {
		font-weight: 600;
		margin-left: 5px;
		color: #fff;
		font-size: 1rem;
		padding: 0 4px;
	}
	.open-files .open-file .close-file:hover {
		background: #333;
		border-radius: 3px;
	}
	.open-files .open-file.open .close-file:hover {
		background: #111;
	}
</style>
