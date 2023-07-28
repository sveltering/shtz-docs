<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	let timeouts: any = [];

	let logoEl: HTMLDivElement;
	onMount(function () {
		let logos = logoEl.querySelectorAll('.i-logo');
		timeouts.push(
			setTimeout(function () {
				for (let i = 0, iLen = logos.length; i < iLen; i++) {
					logos[i].classList.add('animate');
				}
			})
		);
		timeouts.push(
			setTimeout(function () {
				for (let i = 0, iLen = logos.length; i < iLen; i++) {
					logos[i].classList.add('animate2');
				}
			}, 3000)
		);
		timeouts.push(
			setTimeout(function () {
				for (let i = 0, iLen = logos.length; i < iLen; i++) {
					logos[i].classList.remove('animate', 'animate2');
				}
			}, 5000)
		);
	});
	onDestroy(function () {
		for (let i = 0, iLen = timeouts.length; i < iLen; i++) {
			clearTimeout(timeouts[i]);
		}
	});
</script>

<div class="nav">
	<a href="/">
		<div class="logo" bind:this={logoEl}>
			<div class="i-logos">
				<div class="i-logo fade-svelte">
					<img src="/svelte-logo.svg" alt="svelte logo" class="svelte" />
					<div class="i-letter fade-svelte">S</div>
				</div>
				<div class="i-logo fade-hello not-first">
					<img src="/waving-logo.svg" alt="waving logo" />
					<div class="i-letter fade-hello not-first">H</div>
				</div>
				<div class="i-logo fade-trpc not-first">
					<img src="/trpc-logo.svg" alt="trpc logo" />
					<div class="i-letter fade-trpc not-first">T</div>
				</div>
				<div class="i-logo fade-zod not-first">
					<img src="/zod-logo.svg" alt="zod logo" class="zod" />
					<div class="i-letter fade-zod not-first">Z</div>
				</div>
			</div>
		</div>
	</a>
</div>

<style>
	.nav {
		padding: 10px;
	}
	a {
		text-decoration: none;
	}
	.logo {
		position: relative;
		display: inline-block;
	}
	.i-logo {
		position: relative;
		top: 0;
		display: inline-block;
		width: 60px;
		height: 60px;
		animation-fill-mode: forwards;
		vertical-align: top;
	}
	.i-logo.not-first {
		margin-left: -20px;
	}
	.i-letter {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: space-around;
		z-index: 1;
		width: 60px;
		height: 60px;
		animation-fill-mode: forwards;
		font-size: 2rem;
		font-weight: 500;
		color: #fff;
		opacity: 0;
	}
	img {
		z-index: 2;
		position: absolute;
		width: 60px;
		height: 60px;
		animation-fill-mode: forwards;
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
