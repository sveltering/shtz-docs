<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let codeFiles: any[];
	export let padding: number = 1;
	export let first = true;

	const dispatch = createEventDispatcher();

	function loadFile(fileName: string, code: string, id: string, filePath: string) {
		return function () {
			dispatch('loadFile', {
				id,
				fileName,
				filePath,
				code
			});
		};
	}
	function nestedLoadFile(event: Event) {
		dispatch('loadFile', event.detail);
	}
	function toggle(e: MouseEvent) {
		console.log(e);
		const element = e.currentTarget.parentElement as Element;
		console.log(element);
		if (element.classList.contains('hide-files')) {
			element.classList.remove('hide-files');
		} else {
			element.classList.add('hide-files');
		}
	}
</script>

{#each codeFiles as file}
	{#if file?.file}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span
			class="file-name name-outer"
			on:dblclick={loadFile(file.file, file.content, file.id, file.filePath)}
		>
			<span class="name">
				<span class="arrow" />
				{file.file}
			</span>
		</span>
	{/if}
	{#if file?.dir}
		<div class="dir hide-files" class:first>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span class="dir-name name-outer" on:click={toggle}>
				<span class="name">
					<span class="arrow" />
					{file.dir}
				</span>
			</span>
			<div class="files">
				<svelte:self
					codeFiles={file.files}
					on:loadFile={nestedLoadFile}
					padding={padding + 1}
					first={false}
				/>
			</div>
		</div>
	{/if}
{/each}

<style>
	.dir {
		margin-left: 5px;
	}
	.dir .files {
		border-left: 1px solid #aaa;
		margin-left: 9px;
	}
	.dir.first {
		margin-left: 0px;
	}
	.dir.hide-files .files {
		display: none !important;
	}
	.dir .dir-name::before {
		content: '>';
		display: inline-block;
		transform: rotate(90deg);
		color: #aaa;
	}
	.dir.hide-files .dir-name::before {
		transform: rotate(0deg);
	}
	.name-outer {
		padding: 5px;
		cursor: pointer;
		display: block;
		-webkit-user-select: none; /* Safari */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none; /* Standard */
	}
	.name-outer:hover {
		background-color: #555;
	}
	.name {
		color: #fff;
	}
</style>
