<script lang="ts">
	import NoteTitle from '$lib/components/NoteTitle.svelte';

	const { children } = $props();
</script>

<style lang="postcss">
	div {
		@apply mb-48 lg:mb-0;

		grid-template-columns: subgrid;
		grid-column: 1 / -1;
		grid-row: 2 / -1;
		grid-auto-rows: min-content;

		--max-width: min(768px, 100%);

		& :global(*) {
			grid-column: 3 / 5;
			max-width: var(--max-width);
		}
	}
</style>

<div class="note">
	<NoteTitle />
	{@render children()}
</div>
