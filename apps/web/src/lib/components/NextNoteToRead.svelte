<script lang="ts">
	import { getNextNoteTitle, getNotePath } from '$lib/cache/notes';
	import { page } from '$app/state';

	const title = $derived(getNextNoteTitle(page));
</script>

<style lang="postcss">
	div {
		@apply mt-24 color-neutral-500 font-italic;
	}
</style>

<div>
	Something to read next: <a href={getNotePath(title)}>{title}</a>
</div>
