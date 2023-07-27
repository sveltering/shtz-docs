<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let codeFiles: any[];
	export let padding: number = 1;
	export let first = true;
	export let open;
	export let openFull;

	let currentOpen = open?.[0];

	const dispatch = createEventDispatcher();

	function loadFile(
		fileName: string,
		code: string,
		id: string,
		filePath: string
	) {
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
		const element = e.currentTarget.parentElement as Element;
		if (element.classList.contains('hide-files')) {
			element.classList.remove('hide-files');
		} else {
			element.classList.add('hide-files');
		}
	}
	const fileTypeAliases = { html: 'html5' };
	if (open?.length === 1) {
		for (let i = 0, iLen = codeFiles.length; i < iLen; i++) {
			const file = codeFiles[i];
			if (file.file === open[0] && arraysEqual(file.filePath, openFull)) {
				onMount(function () {
					dispatch('loadFile', {
						fileName: file.file,
						code: file.content,
						id: file.id,
						filePath: file.filePath
					});
				});
				break;
			}
		}
	} else {
		open?.shift();
	}
	function arraysEqual(a: any[], b: any[]) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length !== b.length) return false;
		for (var i = 0; i < a.length; ++i) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	}
</script>

{#each codeFiles as file}
	{#if file?.file}
		{@const filetype = file.file.split('.').pop()}
		{@const fileTypeIcon = fileTypeAliases?.[filetype] || filetype}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span
			class="file-name name-outer"
			on:dblclick={loadFile(file.file, file.content, file.id, file.filePath)}
		>
			<span class="name">
				<span class="arrow" />
				<i class="icon {fileTypeIcon}-icon" />{file.file}
			</span>
		</span>
	{/if}
	{#if file?.dir}
		<div
			class="dir hide-files"
			class:first
			class:hide-files={currentOpen !== file.dir}
		>
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
					{open}
					{openFull}
				/>
			</div>
		</div>
	{/if}
{/each}

<style>
	.icon:before {
		width: 20px;
		font-size: 13px;
	}
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
		font-weight: 300;
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
	.file-name {
		white-space: nowrap;
	}
</style>
