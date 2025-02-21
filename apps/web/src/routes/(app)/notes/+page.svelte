<script lang="ts">
	import { getNotePath, notes } from '$lib/cache/notes';
</script>

<style lang="postcss">
	.page-title {
		font-size: var(--font-size-heading);
		line-height: var(--line-height-heading);
	}

	ul {
		list-style-type: disc;
	}
</style>

<h1 class="page-title">Notes</h1>
<ul class="flex flex-col gap-4">
	{#each notes as title}
		<li>
			<a href={getNotePath(title)}>{title}</a>
		</li>
	{/each}
</ul>
