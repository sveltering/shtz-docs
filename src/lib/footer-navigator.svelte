<script lang="ts">
	export let pathsStore: any, pathsInOrder: any[], baseHref: any, paths: any[];

	let prevLink = '';
	let prevTitle = '';
	let prevIsFirst = false;
	let nextLink = '';
	let nextTitle = '';
	let nextIsFirst = false;
	let currentPath = '';
	$: if (paths.length) {
		currentPath = '/' + paths.join('/');
		const index = pathsInOrder.indexOf(currentPath);
		const previous = pathsStore?.[pathsInOrder?.[index - 1]];
		const next = pathsStore?.[pathsInOrder?.[index + 1]];
		prevLink = previous?.url;
		prevTitle = previous?.title;
		prevIsFirst = previous?.first;
		nextLink = next?.url;
		nextTitle = next?.title;
		nextIsFirst = next?.first;
	}
</script>

<div class="end-links">
	{#if prevTitle}
		<div class="end-link previous" class:first={prevIsFirst}>
			<a href={baseHref + prevLink}>
				<span>Previous</span>
				{prevTitle}
			</a>
		</div>
	{/if}
	{#if nextTitle}
		<div class="end-link next" class:first={nextIsFirst}>
			<a href={baseHref + nextLink}>
				<span>Next</span>
				{nextTitle}
			</a>
		</div>
	{/if}
</div>

<style>
	.end-links {
		margin-top: 16px;
		display: inline-flex;
		gap: 10px;
		justify-content: space-between;
		border-top: 1px solid #333;
		padding: 16px 0 6px 0;
		min-width: 420px;
		width: 100%;
	}
	.end-link {
		white-space: nowrap;
		width: 50%;
		min-width: 200px;
		background-color: #000;
		border-radius: 10px;
		flex-grow: 1;
	}
	.end-link a {
		display: block;
		padding: 20px;
		width: 100%;
		height: 100%;
		color: white;
		text-decoration: none;
		font-size: 1.2rem;
		font-weight: 600;
	}
	.end-link.first a,
	.end-link a:hover {
		color: rgb(182, 64, 22);
	}

	.end-link a span {
		display: block;
		font-size: 1rem;
		color: #333;
	}
	.end-link.first a span {
		color: #fff;
	}
	.end-link.next {
		text-align: right;
	}
</style>
