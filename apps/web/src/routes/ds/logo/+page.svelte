<script lang="ts">
	import { Logo } from '@workspace/components/logo';
	import SplitScreen from '$lib/components/SplitScreen.svelte';
	import { getLogoState } from '$lib/cache/logo-state';
	import Snippet from './snippet.md';

	const logoState = getLogoState();
</script>

{#snippet component()}
	<Logo {logoState} />
{/snippet}

{#snippet code()}
	<Snippet />

	<button
		class="rounded-full bg-neutral-300 font-sans cursor-default
			px-16 h-32 inline-flex items-center justify-center"
		onclick={logoState.updateIndex}
	>Change emoji</button>
{/snippet}

<SplitScreen {code} {component} />
