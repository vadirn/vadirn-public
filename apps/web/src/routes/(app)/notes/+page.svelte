<script lang="ts">
	import { getNotePath, notes } from '$lib/cache/notes';
</script>

<style lang="postcss">
	ul {
		@apply list-disc;

		grid-column: 3 / span 2;
	}
</style>

<h1>Notes</h1>
<ul>
	{#each notes as title}
		<li>
			<a href={getNotePath(title)}>{title}</a>
		</li>
	{/each}
</ul>
