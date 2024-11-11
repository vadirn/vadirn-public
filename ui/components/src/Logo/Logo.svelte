<script lang="ts">
	import type { LogoState } from './state.svelte';

	const { logoState }: { logoState: LogoState } = $props();
</script>

<style lang="postcss">
	figure {
		display: inline-block;
	}

	.code {
		animation: code 800ms cubic-bezier(0.33, 1.25, 0.68, 1.25) forwards;
		transform-origin: bottom left;
	}

	@keyframes code {
		0%, 100% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(-16deg);
		}
	}

	.ski {
		offset-path: path('M0,0 A4,4 0 1,1 8,0');
		offset-anchor: top left;
		animation: ski 1800ms cubic-bezier(0.33, 1.25, 0.68, 1.25) forwards;
	}

	@keyframes ski {
		0%, 100% {
			offset-distance: 0%;
			offset-rotate: 0deg;
		}

		50% {
			offset-distance: 100%;
			offset-rotate: 0deg;
		}
	}

	.ball {
		animation: ball 1600ms cubic-bezier(0.33, 0.84, 0.42, 1) forwards;
	}

	@keyframes ball {
		0%, 80%, 100% {
			transform: translateY(0) scale(1, 1);
		}

		20% {
			transform: translateY(10%) scale(1.2, 0.8); /* Squash */
		}

		40% {
			transform: translateY(-80%) scale(0.8, 1.2); /* Stretch */
		}

		50% {
			transform: translateY(10%) scale(1.2, 0.8); /* Squash */
		}
	}

	.game {
		animation: game 2000ms steps(3) forwards;
	}

	@keyframes game {
		0%, 100% {
			transform: translateX(0);
		}

		50% {
			transform: translateX(8px);
		}
	}
</style>

<a
	class="font-sans text-heading font-bold no-underline"
	href='/'
><figure
	class="w-32"
	class:ball={logoState.index === 2}
	class:code={logoState.index === 0}
	class:game={logoState.index === 3}
	class:ski={logoState.index === 1}
>{logoState.emoji}</figure>Vadim Kotov</a>
