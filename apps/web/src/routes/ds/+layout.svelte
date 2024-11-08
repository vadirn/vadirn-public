<script lang="ts">
	const { children } = $props();
</script>

<style lang="postcss">
	nav {
		@apply flex-none w-[180px] p-16;
	}
	main {
		@apply flex-auto border-l border-solid border-neutral-300;
	}
</style>

<div class="flex">
	<nav>
		<ul>
			<li>
				<a href="/ds/logo">Logo</a>
			</li>
		</ul>
	</nav>

	<main>
		{@render children()}
	</main>
</div>
