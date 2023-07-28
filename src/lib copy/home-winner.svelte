<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	let timeouts: any = [];

	let logoEl: HTMLDivElement;
	let wrapperEl: HTMLDivElement;
	let embedEl: HTMLDivElement;

	let mounted = false;
	onMount(() => (mounted = browser));

	let loadcount: number = 0;
	$: if (mounted && loadcount > 3) {
		let logos = logoEl.querySelectorAll('.i-logo');
		timeouts.push(
			setTimeout(function () {
				for (let i = 0, iLen = logos.length; i < iLen; i++) {
					logos[i].classList.add('animate');
				}
			}, 500)
		);
		timeouts.push(
			setTimeout(function () {
				wrapperEl.classList.add('animation-done');
			}, 3000)
		);
	}
	$: if (mounted) {
		(logoEl.querySelector('img.svelte') as HTMLImageElement).src =
			'/svelte-logo.svg';
		(logoEl.querySelector('img.waving') as HTMLImageElement).src =
			'/waving-logo.svg';
		(logoEl.querySelector('img.trpc') as HTMLImageElement).src =
			'/trpc-logo.svg';
		(logoEl.querySelector('img.zod') as HTMLImageElement).src = '/zod-logo.svg';
	}
	function imgLoaded() {
		loadcount++;
	}
	onDestroy(function () {
		for (let i = 0, iLen = timeouts.length; i < iLen; i++) {
			clearTimeout(timeouts[i]);
		}
	});
</script>

<svelte:head>
	<meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin" />
	<meta http-equiv="Cross-Origin-Embedder-Policy" content="require-corp" />
</svelte:head>

<div class="wrapper" bind:this={wrapperEl}>
	<div class="logo" bind:this={logoEl}>
		<div class="i-logos">
			<div class="i-logo fade-svelte">
				<img alt="svelte logo" class="svelte" on:load={imgLoaded} />
				<div class="i-letter fade-svelte">S</div>
			</div>
			<div class="i-logo fade-hello not-first">
				<img alt="waving logo" class="waving" on:load={imgLoaded} />
				<div class="i-letter fade-hello not-first">H</div>
			</div>
			<div class="i-logo fade-trpc not-first">
				<img alt="trpc logo" class="trpc" on:load={imgLoaded} />
				<div class="i-letter fade-trpc not-first">T</div>
			</div>
			<div class="i-logo fade-zod not-first">
				<img alt="zod logo" class="zod" on:load={imgLoaded} />
				<div class="i-letter fade-zod not-first">Z</div>
			</div>
		</div>
	</div>
	<div class="links">
		<a href="/docs/v0/install"><i class="icon text-icon" />Docs</a>
		<a href="https://github.com/sveltering/shtz" target="_blank"
			><i class="icon github-icon" />Github</a
		>
		<a href="https://www.npmjs.com/package/@sveltering/shtz" target="_blank"
			><i class="icon npm-icon" />npm</a
		>
	</div>
</div>

<div class="frame">
	<!-- <div bind:this={embedEl} /> -->
	<iframe
		src="https://stackblitz.com/edit/github-ror6t4-ygnopj?embed=1&file=src%2Froutes%2F%2Bpage.svelte&hideExplorer=1&theme=dark"
		allow="cross-origin-isolated"
		title="Demo"
	/>
</div>

<style>
	.wrapper {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 20px;
		transition: height 1s;
	}
	:global(.wrapper.animation-done) {
		height: 150px !important;
		transition: height 1s ease-in;
	}
	.frame {
		width: 100%;
		height: 100%;
		padding: 20px;
		border: 0;
	}
	:global(.frame iframe) {
		width: 100%;
		height: 100%;
		border: 0;
	}
	.links {
		margin-top: 30px;
		font-size: 2rem;
	}
	.links a {
		text-decoration: underline;
		text-underline-offset: 10px;
	}
	.links .icon::before {
		font-size: 25px;
		width: 30px;
	}
	.links a:hover {
		text-underline-offset: 5px;
	}
	.logo {
		position: relative;
		display: inline-block;
	}
	.i-logo {
		position: relative;
		top: 0;
		display: inline-block;
		width: 150px;
		height: 150px;
		animation-fill-mode: forwards;
		vertical-align: top;
	}
	.i-logo.not-first {
		margin-left: -50px;
	}
	.i-letter {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: space-around;
		z-index: 1;
		width: 150px;
		height: 150px;
		animation-fill-mode: forwards;
		font-size: 5rem;
		font-weight: 500;
		color: #fff;
		opacity: 0;
	}
	:global(.animation-done) .i-letter {
		width: 100px;
		height: 100px;
		font-size: 3rem;
		transition: height 1s, width 1s, font-size 1s;
	}
	:global(.animation-done) .i-logo {
		width: 100px;
		height: 100px;
		transition: height 1s, width 1s, font-size 1s;
	}

	:global(.animation-done) .links {
		margin-top: 10px;
		font-size: 1rem;
		transition: margin 1s, font-size 1s;
	}
	:global(.animation-done) .links .icon::before {
		font-size: 15px;
		width: 20px;
		transition: width 1s, font-size 1s;
	}
	:global(.animation-done) .i-logo img {
		display: none;
	}
	img {
		z-index: 2;
		position: absolute;
		width: 150px;
		height: 150px;
		animation-fill-mode: forwards;
	}
	img.svelte {
		width: 170px;
		height: 170px;
		top: -10px;
		left: -10px;
	}
	img.zod {
		width: 195px;
		height: 195px;
		top: -30px;
		left: -25px;
	}
	.i-logo:not(.animate):hover img {
		animation: fadeOut 500ms;
		animation-fill-mode: forwards;
	}
	.i-logo:not(.animate):hover .i-letter {
		animation: fadeIn 500ms;
		animation-fill-mode: forwards;
	}

	:global(.i-logo.animate) img {
		animation: fadeOut 2000ms;
		animation-fill-mode: forwards;
	}
	:global(.i-logo.animate) .i-letter {
		animation: fadeIn 2000ms;
		animation-fill-mode: forwards;
	}
	:global(.i-logo.animate2) img {
		animation: fadeIn 2000ms;
		animation-fill-mode: forwards;
	}
	:global(.i-logo.animate2) .i-letter {
		animation: fadeOut 2000ms;
		animation-fill-mode: forwards;
	}
	@media (max-width: 1400px) {
		.i-logo {
			width: 60px;
			height: 60px;
		}

		.i-logo.not-first {
			margin-left: -20px;
		}
		.i-letter {
			width: 60px;
			height: 60px;
			font-size: 2rem;
		}
		img {
			width: 60px;
			height: 60px;
		}
		img.svelte {
			width: 68px;
			height: 68px;
			top: -4px;
			left: -4px;
		}
		img.zod {
			width: 78px;
			height: 78px;
			top: -12px;
			left: -10px;
		}
	}

	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
