<script lang="ts">
	import type { Snippet } from 'svelte';
	const { component, code, position = 'default' }: {
		component?: Snippet;
		code?: Snippet;
		position?: 'default' | 'center';
	} = $props();
</script>

<style lang="postcss">
	.component-container {
		@apply border-r border-solid border-neutral-300;
	}

	.center {
		@apply flex flex-col items-center;
	}

	.code-container {
		@apply bg-neutral-200
			text-neutral-500 pl-32 pr-16
			overscroll-contain overflow-y-scroll;

		& :global(pre) {
			@apply overflow-scroll p-8 overscroll-contain text-small;
		}

		& :global(pre), :global(p), :global(ul) {
			@apply mb-20;
		}

		& :global(code:not(pre code)) {
			@apply bg-neutral-300 px-4 rounded;
		}

		& :global(ul) {
			@apply list-disc;
		}

		& :global(li) {
			@apply mb-8;
		}
	}

	.code {
		@apply flex flex-col items-center  h-full;

		max-width: 700px;
	}
</style>

<div class="h-svh grid grid-cols-2">
	<div class="component-container" class:center={position === 'center'}>
		<div class="flex-auto"></div>
		<div class="flex-none max-w-full">
			{@render component?.()}
		</div>
		<div class="flex-auto"></div>
	</div>
	{#if code}
		<div class="code-container">
			<div class="code">
				<div class="flex-auto min-h-16"></div>
				<div class="flex-none w-full">
					{@render code()}
				</div>
				<div class="flex-auto min-h-32"></div>
			</div>
		</div>
	{/if}
</div>
