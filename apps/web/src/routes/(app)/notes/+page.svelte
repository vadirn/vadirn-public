<script lang="ts">
	import { getNotePath, notes } from '$lib/cache/notes';
</script>

<style lang="postcss">
	ul {
		list-style-type: disc;
	}
</style>

<h1 class="text-heading bold mb-8">Notes</h1>
<ul class="flex flex-col gap-4">
	{#each notes as title}
		<li>
			<a href={getNotePath(title)}>{title}</a>
		</li>
	{/each}
</ul>
