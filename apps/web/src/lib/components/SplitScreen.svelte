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
	.split {
		@apply h-svh grid grid-cols-2;

		grid-auto-rows: minmax(0, 1fr);
	}

	.center {
		@apply flex flex-col items-center;
	}

	.docs-container {
		@apply flex flex-col h-full;

		background-color: oklch(from var(--color-grey-100) l c h / 40%);
	}

	.docs {
		@apply grid gap-24 p-inline-16 py-24 overflow-y-scroll m-y-auto;

		grid-auto-rows: min-content;
		justify-items: start;
		overscroll-behavior: contain;

		& :global(*) {
			max-width: min(720px, 100%);
		}
	}
</style>

<div class="split">
	<div class:center={position === 'center'}>
		<div class="flex-auto"></div>
		<div class="flex-none max-w-full">
			{@render component?.()}
		</div>
		<div class="flex-auto"></div>
	</div>
	{#if docs}
		<div class="docs-container">
			<div class="note docs">
				{@render docs()}
			</div>
		</div>
	{/if}
</div>
