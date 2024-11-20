<script lang="ts">
	import { getCurrentNoteTitle } from '$lib/cache/notes';
	import Text from './text.md';

	const title = getCurrentNoteTitle();
</script>

<h1>{title}</h1>

<Text />
