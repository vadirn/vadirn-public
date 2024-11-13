<script lang="ts">
	import { note, notes } from '$lib/cache/notes';
</script>

<ul class="list-disc list-inside">
	{#each notes as title}
		<li class="mb-4">
			<a href={note(title.toLowerCase())}>{title}</a>
		</li>
	{/each}
</ul>
