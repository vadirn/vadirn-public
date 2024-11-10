<script lang="ts">
	import { ds } from '$lib/paths/ds';
	import { page } from '$app/stores';
	const { children } = $props();

	const selectedPath = $derived($page.url.pathname);
</script>

<style lang="postcss">
	nav {
		@apply flex-none w-[180px] p-16 min-h-svh;
	}

	main {
		@apply flex-auto border-l border-solid border-neutral-300;
	}

	.nav-item {
		@apply border-b border-solid block w-fit;

		a {
			@apply px-4;
		}
	}

	.selected {
		@apply border-accent;
	}
</style>

{#snippet navItem(path: string, text: string)}
	<li class="nav-item" class:selected={path === selectedPath}>
		<a href="{path}">{text}</a>
	</li>
{/snippet}

<div class="flex">
	<nav>
		<ul class="flex flex-col gap-4">
			{@render navItem(ds.logo.toString(), 'Logo')}
			{@render navItem(ds.navigation.toString(), 'Navigation')}
		</ul>
	</nav>

	<main>
		{@render children()}
	</main>
</div>
