<script lang="ts">
	import { getNotePath, notes } from '$lib/cache/notes';
</script>

<style lang="postcss">
	ul {
		@apply col-start-3 col-span-2 list-disc;
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
