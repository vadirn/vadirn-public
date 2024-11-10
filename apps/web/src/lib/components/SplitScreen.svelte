<script lang="ts">
	import type { Snippet } from 'svelte';
	const { component, code }: {
		component?: Snippet;
		code?: Snippet;
	} = $props();
</script>

<style lang="postcss">
	.col-a {
		@apply flex flex-col items-center
			border-r border-solid border-neutral-300;
	}

	.col-b {
		@apply flex flex-col items-center bg-neutral-200
			text-neutral-500 p-16;

		& :global(pre) {
			@apply overflow-scroll p-8 overscroll-contain text-caption;
		}

		& :global(pre), :global(p) {
			@apply mb-20;
		}
	}
</style>

<div class="min-h-svh grid grid-cols-2">
	<div class="col-a">
		<div class="flex-auto"></div>
		<div class="flex-none max-w-full">
			{@render component?.()}
		</div>
		<div class="flex-auto"></div>
	</div>
	{#if code}
		<div class="col-b">
			<div class="flex-auto"></div>
			<div class="flex-none w-full">
				{@render code()}
			</div>
			<div class="flex-auto"></div>
		</div>
	{/if}
</div>
