<script lang="ts">
	import type { Snippet } from 'svelte';
	type Props = {
		component?: Snippet;
		docs?: Snippet;
		position?: 'default' | 'center';
	};

	const { component, docs, position = 'default' }: Props = $props();
</script>

<style lang="postcss">
	.root {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns:
			[left-column-start]
			1fr
			[left-column-end right-column-start]
			1fr
			[right-column-end];
		height: 100svh;
	}

	.left-column {
		grid-column: left-column;
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.right-column {
		display: flex;
		flex-direction: column;
		grid-column: right-column;
		padding: var(--size-24);
		overflow-x: scroll;
		overscroll-behavior: contain;
		background-color: var(--color-grey-50);

		:global(.dark) & {
			background-color: var(--color-grey-700);
		}
	}

	.docs {
		--line-height: var(--line-height-body);

		max-width: min(720px, 100%);

		:global(p), :global(ul), :global(table), :global(h1), :global(h2) {
			margin-bottom: var(--line-height);
		}

		:global(h1) {
			font-size: var(--font-size-title);
			font-weight: var(--font-weight-bold);
			line-height: var(--line-height-title);
			letter-spacing: var(--letter-spacing-tight);
		}

		:global(h2) {
			font-size: var(--font-size-heading);
			font-weight: var(--font-weight-bold);
			line-height: var(--line-height-heading);
		}

		:global(ul) {
			padding-left: var(--size-24);
			list-style-type: disc;
		}

		:global(pre) {
			width: 100%;
			padding: var(--size-8);
			margin-bottom: var(--line-height);
			overflow-x: scroll;
			overscroll-behavior-x: contain;
			background-color: var(--color-grey-100);
			border-radius: var(--radius-8);
		}

		:global(pre code) {
			display: block;
			width: max-content;
			padding-inline-end: var(--size-4);
			font-size: var(--font-size-mono);
			line-height: var(--line-height-body);
			color: var(--color-black);

			@media (--gt-tablet) {
				margin-bottom: 0;
			}
		}
	}
</style>

<div class="root">
	<div class="left-column" class:center={position === 'center'}>
		<div class="flex-auto"></div>
		<div class="flex-none max-w-full">
			{@render component?.()}
		</div>
		<div class="flex-auto"></div>
	</div>
	{#if docs}
		<div class="right-column">
			<div class="docs">
				{@render docs()}
			</div>
		</div>
	{/if}
</div>
