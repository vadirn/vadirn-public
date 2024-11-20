<script lang="ts">
	import { note, notes } from '$lib/cache/notes';
</script>

<style lang="postcss">
	h1, ul {
		@apply col-start-3 col-span-2;
	}

	ul {
		@apply list-disc;
	}
</style>

<h1>Notes</h1>

<ul>
	{#each notes as title}
		<li>
			<a href={note(title.toLowerCase())}>{title}</a>
		</li>
	{/each}
</ul>
