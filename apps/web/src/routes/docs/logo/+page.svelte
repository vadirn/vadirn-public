<script lang="ts">
	import { Logo } from '@ui/components/logo';
	import { Button } from '@ui/components/button';
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
		<Button onclick={logoState.updateIndex}>Change emoji</Button>
	{/snippet}
</SplitScreen>
