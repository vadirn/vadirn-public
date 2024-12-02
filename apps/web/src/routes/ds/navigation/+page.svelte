<script lang="ts">
	import { Navigation } from '@ui/components/navigation';
	import SplitScreen from '$lib/components/SplitScreen.svelte';
	import { app } from '$lib/paths/app';
	import { getLogoState } from '$lib/cache/logo-state';
	import Snippet from './snippet.md';
</script>

{#snippet component()}
	<div class="p-16">
		<Navigation
			links={[
				{ title: 'Notes', href: app.notes.toString() },
				{ title: 'Github', href: 'https://github.com/vadirn', blank: true },
				{ title: 'About', href: app.about.toString() },
			]}
			logoState={getLogoState()}
		/>
	</div>
{/snippet}

{#snippet code()}
	<Snippet />
{/snippet}

<SplitScreen {code} {component} />
