<script lang="ts">
	import { isNonEmptyString } from '@libs/standard/string';
	import { Meta } from '@ui/components/meta';
	import { getCurrentNoteTitle } from '$lib/cache/notes';
	import { getMeta } from '$lib/cache/meta';
	import { page } from '$app/state';

	const title = $derived(getCurrentNoteTitle(page));
</script>

{#if isNonEmptyString(title)}
	<Meta {...getMeta({ title })} />
	<h1>{title}</h1>
{/if}
