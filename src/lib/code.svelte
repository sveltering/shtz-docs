<script lang="ts">
	export let path;
	import Filenav from '$lib/filenav.svelte';

	let openFiles: any = {};
	let currentId: string = undefined as any as string;
	function loadFile(event: any) {
		const id = event.detail.id;
		console.log(event.detail);
		if (openFiles?.[id]) {
			currentId = id;
			return;
		}
		openFiles[id] = event.detail;
		currentId = id;
	}
	const fileTypeAliases = { html: 'html5' };
</script>

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
							<i class="icon {fileTypeIcon}-icon" />
							{path}
						{:else}
							{path}&nbsp &gt; &nbsp;
						{/if}
					{/each}
				</div>
				<div class="code">
					{details.code}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.nav {
		background: #111;
	}
	.icon:before {
		width: 14px;
		font-size: 13px;
	}
	.code-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: flex-start;
		align-items: flex-start;
	}
	.code-container .code-column {
		padding: 10px;
	}
	.code-container .code-column.content {
		flex: auto;
		background: #333;
		padding: 0;
	}
	.code-container .code-column.content .code-outer {
		display: none;
		padding: 10px;
	}
	.code-container .code-column.content .code-outer .navigate {
		margin: 0 0 10px 0;
	}
	.code-container .code-column.content .code-outer.show {
		display: block;
	}
	.open-files {
		overflow-x: auto;
	}
	.open-files {
		background: #111;
	}
	.open-files .open-file {
		display: inline-block;
		padding: 10px 20px;
		cursor: pointer;
		border-top: 1px solid transparent;
	}
	.open-files .open-file.open {
		background: #333;
		border-top: 1px solid rgb(13, 13, 204);
	}
	.open-files .open-file .close-file {
		font-weight: 600;
		margin-left: 5px;
		color: #fff;
		font-size: 0.8rem;
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
