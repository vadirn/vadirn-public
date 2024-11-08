<script lang="ts">
	import { Logo } from '@workspace/components/logo';
	import SplitScreen from '$lib/components/SplitScreen.svelte';
	import Snippet from './snippet.md';
</script>

{#snippet component()}
	<Logo />
{/snippet}

{#snippet code()}
	<Snippet />
{/snippet}

<SplitScreen {code} {component} />
