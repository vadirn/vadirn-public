<script lang="ts">
	import { getNextNoteTitle, getNotePath } from '$lib/cache/notes';
	import { page } from '$app/state';

	const title = $derived(getNextNoteTitle(page));
</script>

<style lang="postcss">
	.root {
		margin-bottom: var(--size-24);
		font-style: italic;
		color: var(--color-neutral-500);
	}
</style>

<div class="root">
	Something to read next: <a href={getNotePath(title)}>{title}</a>
</div>
