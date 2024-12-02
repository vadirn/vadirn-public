<script lang="ts">
	import { Logo } from '@ui/components/logo';
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

	<button onclick={logoState.updateIndex}>Change emoji</button>
{/snippet}

<SplitScreen {code} {component} position="center" />
