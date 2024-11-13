<script lang="ts">
	const { children } = $props();
</script>

<style lang="postcss">
	div {
		@apply px-64 pb-16;

		grid-column: 1 / -1;
	}
</style>

<div>
	{@render children()}
</div>
