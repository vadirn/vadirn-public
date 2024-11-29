<script lang="ts">
	import { getNextNoteTitle, getNotePath } from '$lib/cache/notes';
	import { page } from '$app/stores';

	const title = getNextNoteTitle($page);
</script>

<a href={getNotePath(title)}>{title}</a>
