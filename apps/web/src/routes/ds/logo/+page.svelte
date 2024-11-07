<script lang="ts">
	import { Logo } from '@workspace/components/logo';
	import Code from '../Code.svelte';
	import SplitScreen from '../SplitScreen.svelte';
</script>

{#snippet component()}
	<Logo />
{/snippet}

{#snippet code()}
	<Code src={`

<Logo />

`} />
{/snippet}

<SplitScreen {code} {component} />
