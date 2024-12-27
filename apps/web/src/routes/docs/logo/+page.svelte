<script lang="ts">
	import { Logo } from '@ui/components/logo';
	import SplitScreen from '$lib/components/SplitScreen.svelte';
	import { getLogoState } from '$lib/cache/logo-state';
	import Docs from './docs.md';

	const logoState = getLogoState();
</script>

<SplitScreen position="center">
	{#snippet component()}
		<Logo {logoState} />
	{/snippet}

	{#snippet docs()}
		<Docs />

		<button onclick={logoState.updateIndex}>Change emoji</button>
	{/snippet}
</SplitScreen>
