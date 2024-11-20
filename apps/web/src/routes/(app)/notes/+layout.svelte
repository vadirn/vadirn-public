<script lang="ts">
	const { children } = $props();
</script>

<style lang="postcss">
	div {
		@apply grid leading-6 gap-24;

		grid-template-columns: subgrid;
		grid-column: 1 / -1;
		grid-auto-rows: min-content;

		--max-width: 768px;

		& :global(*) {
			grid-column: 3 / 5;
			max-width: var(--max-width);
		}

		:global(h1) {
			@apply text-title font-bold;
		}

		:global(ul) {
			@apply list-disc pl-24;
		}

		:global(table) {
			@apply mx-8 text-caption table-fixed border-collapse border
				border-neutral-300 bg-neutral-200;

			max-width: calc(var(--max-width) - 16px);
		}

		:global(tr) {
			@apply border-b border-neutral-300;
		}

		:global(td) {
			@apply py-4 px-8 border-r border-neutral-300;
		}

		:global(thead) {
			@apply text-neutral-600 text-left bg-neutral-300;

			& :global(th) {
				@apply p-8 border-neutral-400 border-r;
			}

			& :global(th:last-child) {
				@apply border-none;
			}
		}

		& :global(pre) {
			@apply p-8 text-caption rounded
				overflow-scroll overscroll-contain;
		}

		& :global(.code) {
			@apply bg-neutral-200 py-24 grid grid-cols-subgrid gap-24;

			grid-column: 1 / -1;
		}

		& :global(code:not(pre code)) {
			@apply bg-neutral-300 px-4 rounded;
		}

		& :global(.callout) {
			@apply bg-warning/10 py-24
				grid grid-cols-subgrid gap-24;

			grid-column: 1 / -1;

			& :global(:last-child) {
				@apply mb-0;
			}
		}

		& :global(img) {
			@apply max-w-full;
		}
	}
</style>

<div>
	{@render children()}
</div>
