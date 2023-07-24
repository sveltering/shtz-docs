<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let codeFiles: any[];
	export let padding: number = 1;

	const dispatch = createEventDispatcher();

	function loadFile(fileName: string, code: string, id: string) {
		return function () {
			dispatch('loadFile', {
				id,
				fileName,
				code
			});
		};
	}
	function nestedLoadFile(event: Event) {
		dispatch('loadFile', event.detail);
	}
	function toggle(e: MouseEvent) {
		const element = e.target.parentElement.parentElement as Element;
		console.log(element);
		if (element.classList.contains('hide')) {
			element.classList.remove('hide');
		} else {
			element.classList.add('hide');
		}
	}
</script>

{#each codeFiles as file}
	{#if file?.file}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span class="fileName" on:dblclick={loadFile(file.file, file.content, file.id)}>
			<span class="name">
				<span class="arrow" />
				<span class="hide">{Array(padding).join('A')}</span>{file.file}</span
			>
		</span>
	{/if}
	{#if file?.dir}
		<div class="childDir hide">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span class="dirName" on:click={toggle}>
				<span class="name"
					><span class="hide">{Array(padding).join('A')}</span>
					<span class="arrow" />
					{file.dir}</span
				>
			</span>
			<div class="files">
				<svelte:self codeFiles={file.files} on:loadFile={nestedLoadFile} padding={padding + 1} />
			</div>
		</div>
	{/if}
{/each}

<style>
	span.fileName:hover,
	span.dirName:hover {
		background-color: #666;
	}
	span.name {
		display: block;
		cursor: pointer;
		user-select: none;
		padding: 5px;
	}
	span.name span.hide {
		visibility: hidden;
	}
	span.fileName:hover span.name,
	span.dirName:hover span.name {
		background-color: #666;
	}
	.hide .files {
		display: none !important;
	}
	.childDir .dirName .arrow::before {
		content: '>';
		display: inline-block;
		transform: rotate(90deg);
		font-weight: 600;
	}
	.childDir.hide .dirName .arrow::before {
		content: '>';
		transform: rotate(0deg);
	}
</style>
