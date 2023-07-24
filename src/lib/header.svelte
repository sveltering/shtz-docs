<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let navbar: Element;
	let timeouts: any = [];
	onMount(function () {
		let logo = navbar.querySelector('.logo');
		logo?.classList.add('animating');
		let logos = navbar.querySelectorAll('.i-logo');
		timeouts.push(
			setTimeout(function () {
				for (let i = 0, iLen = logos.length; i < iLen; i++) {
					logos[i].classList.remove('noanim');
					logos[i].classList.add('fade');
				}
			}, 500)
		);
		timeouts.push(
			setTimeout(function () {
				for (let i = 0, iLen = logos.length; i < iLen; i++) {
					logos[i].classList.add('hide');
				}
			}, 2400)
		);
		timeouts.push(
			setTimeout(function () {
				for (let i = 0, iLen = logos.length; i < iLen; i++) {
					logos[i].classList.add('fadeIn');
					logos[i].classList.remove('hide');
				}
			}, 3000)
		);
		timeouts.push(
			setTimeout(function () {
				for (let i = 0, iLen = logos.length; i < iLen; i++) {
					logos[i].classList.add('noanim');
				}
				logo?.classList.remove('animating');
			}, 5000)
		);
	});
	onDestroy(function () {
		for (let i = 0, iLen = timeouts.length; i < iLen; i++) {
			clearTimeout(timeouts[i]);
		}
	});
</script>

<div class="navbar" bind:this={navbar}>
	<div class="inner">
		<a href="/" class="logo-href">
			<div class="logo">
				<div class="i-logo noanim svelte">
					<img src="/svelte-logo.svg" alt="svelte logo" />
					<div class="i-letter">S</div>
				</div>
				<div class="i-logo noanim waving">
					<img src="/waving-logo.svg" alt="waving logo" />
					<div class="i-letter">H</div>
				</div>
				<div class="i-logo noanim trpc">
					<img src="/trpc-logo.svg" alt="trpc logo" />
					<div class="i-letter">T</div>
				</div>
				<div class="i-logo noanim zod">
					<img src="/zod-logo.svg" alt="zod logo" />
					<div class="i-letter">Z</div>
				</div>
			</div>
		</a>
	</div>
</div>

<style>
	.navbar .inner {
		max-width: 1000px;
		margin: 0 auto;
		padding: 10px;
	}
	a.logo-href {
		text-decoration: none;
		color: #eee;
	}
	.navbar .logo {
		display: inline-block;
		height: 60px;
		margin-left: 25px;
	}
	.navbar .logo img {
		height: 60px;
		width: 60px;
	}
	.navbar .i-logo.zod img {
		width: 70px;
		height: 70px;
	}
	.logo .i-logo {
		position: relative;
		display: inline-block;
		height: 60px;
		width: 60px;
		margin-left: -25px;
	}
	.logo .i-logo.zod {
		margin-left: -30px;
		/* z-index: 1; */
	}
	.navbar .logo:not(.animating) .i-logo:hover img {
		animation: fadeOut 1s;
		animation-fill-mode: forwards;
	}
	.navbar .logo:not(.animating) .i-logo:hover .i-letter {
		animation: fadeIn 1s;
		animation-fill-mode: forwards;
	}

	/* .logo .i-logo.trpc {
		z-index: 2;
	}
	.logo .i-logo.waving {
		z-index: 3;
	}
	.logo .i-logo.svelte {
		z-index: 4;
	} */
	.i-logo .i-letter {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 2rem;
		z-index: 1;
		font-weight: 500;
	}
	.i-logo.zod .i-letter {
		margin-top: 10px;
		margin-left: 5px;
	}

	:global(.i-logo.noanim) .i-letter {
		opacity: 0;
	}
	.i-logo img {
		position: relative;
		z-index: 2;
	}

	:global(.i-logo.fade) img {
		animation: fadeOut 2s;
	}
	:global(.i-logo.fade) .i-letter {
		animation: fadeIn 2s;
	}

	:global(.i-logo.fadeIn) img {
		animation: fadeIn 2s;
	}
	:global(.i-logo.fadeIn) .i-letter {
		animation: fadeOut 2s;
	}
	:global(.i-logo.hide) img {
		opacity: 0;
	}

	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			display: none;
		}
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
			display: none;
		}
	}
</style>
