<script lang="ts">
	import { Meta } from '@ui/components/meta';
	import { getMeta, notesCardUrl } from '$lib/cache/meta';

	const { children } = $props();
</script>

<style lang="postcss">
	div {
		@apply mb-48 lg:mb-0;

		grid-template-columns: subgrid;
		grid-row: 2 / -1;
		grid-column: 1 / -1;
		grid-auto-rows: min-content;

		--max-width: min(720px, 100%);

		& :global(*:not(code)) {
			grid-column: 3 / 5;
			max-width: var(--max-width);
		}
	}
</style>

<Meta
	{...getMeta({
		openGraph: { image: notesCardUrl },
		twitter: { image: notesCardUrl },
	})}
/>

<div class="note">
	{@render children?.()}
</div>
