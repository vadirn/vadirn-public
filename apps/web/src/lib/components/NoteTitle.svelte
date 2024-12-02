<script lang="ts">
	import { isNonEmptyString } from '@libs/standard/string';
	import { getCurrentNoteTitle } from '$lib/cache/notes';
	import { page } from '$app/stores';

	const title = $derived(getCurrentNoteTitle($page));
</script>

{#if isNonEmptyString(title)}
	<h1>{title}</h1>
{/if}
