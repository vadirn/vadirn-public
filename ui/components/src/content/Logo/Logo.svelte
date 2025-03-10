<script lang="ts">
	import { Emoji, type LogoState } from './state.svelte';

	const { logoState }: { logoState: LogoState } = $props();
</script>

<style lang="postcss">
	.text-heading {
		font-weight: var(--font-weight-bold);
		text-decoration-line: none;
	}

	figure {
		display: inline-block;
		width: var(--size-32);
	}

	.code {
		transform-origin: bottom left;
		animation: code 800ms cubic-bezier(0.33, 1.25, 0.68, 1.25) forwards;
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

<a class='text-heading' href='/'><figure
	class:ball={logoState.index === Emoji.Ball}
	class:code={logoState.index === Emoji.Code}
	class:game={logoState.index === Emoji.Game}
	class:ski={logoState.index === Emoji.Ski}
>{logoState.emoji}</figure>Vadim Kotov</a>
