<script lang="ts">
	import { getNextNoteTitle, getNotePath } from '$lib/cache/notes';
	import { page } from '$app/stores';

	const title = $derived(getNextNoteTitle($page));
</script>

<style lang="postcss">
	div {
		@apply mt-24 italic text-neutral-500;
	}
</style>

<div>
	Something to read next: <a href={getNotePath(title)}>{title}</a>
</div>
