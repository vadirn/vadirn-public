<script lang="ts">
	import NextNoteToRead from '$lib/components/NextNoteToRead.svelte';
	import NoteTitle from '$lib/components/NoteTitle.svelte';

	const { children } = $props();
</script>

<NoteTitle />
{@render children()}
<NextNoteToRead />
