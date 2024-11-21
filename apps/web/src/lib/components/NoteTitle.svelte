<script lang="ts">
	import { getCurrentNoteTitle } from '$lib/cache/notes';
	import { page } from '$app/stores';

	const title = $derived(getCurrentNoteTitle($page));
</script>

<h1>{title}</h1>
