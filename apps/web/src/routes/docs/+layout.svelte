<script lang="ts">
	import { docs } from '$lib/paths/docs';
	import { page } from '$app/state';
	const { children } = $props();

	const selectedPath = $derived(page.url.pathname);
</script>

<style lang="postcss">
	nav {
		flex: none;
		width: var(--size-192);
		min-height: 100svh;
		padding-block: var(--size-16);
	}

	main {
		flex: 1 1 auto;
		tab-size: 4;
		border-left: var(--line-width-1) solid var(--color-grey-300);
	}

	.nav-item {
		display: block;

		a {
			display: block;
			padding: var(--size-4) var(--size-16);
			text-decoration: none;
		}
	}

	.selected {
		background-color: var(--color-yellow-100);

		:global(.dark) & {
			background-color: var(--color-yellow-400);
		}
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
			{@render navItem(docs.logo.toString(), 'Logo')}
			{@render navItem(docs.navigation.toString(), 'Navigation')}
		</ul>
	</nav>

	<main>
		{@render children?.()}
	</main>
</div>
