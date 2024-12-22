<script lang="ts">
	import { ds } from '$lib/paths/ds';
	import { page } from '$app/stores';
	const { children } = $props();

	const selectedPath = $derived($page.url.pathname);
</script>

<style lang="postcss">
	nav {
		@apply flex-none w-[180px] py-16 min-h-svh;
	}

	main {
		@apply flex-auto border-0 border-l-1 border-solid border-neutral-300;
	}

	.nav-item {
		@apply block;

		a {
			@apply block px-16 py-4 no-underline;
		}
	}

	.selected {
		@apply bg-yellow-100 dark:bg-yellow-400;
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
			<li class="nav-item"><a href="/">&larr;&nbsp;Back</a></li>
			{@render navItem(ds.logo.toString(), 'Logo')}
			{@render navItem(ds.navigation.toString(), 'Navigation')}
		</ul>
	</nav>

	<main>
		{@render children?.()}
	</main>
</div>
