<script lang="ts">
	import { Navigation } from '@ui/components/navigation';
	import SplitScreen from '$lib/components/SplitScreen.svelte';
	import { app } from '$lib/paths/app';
	import { getLogoState } from '$lib/cache/logo-state';
	import Docs from './docs.md';
</script>

<SplitScreen>
	{#snippet component()}
		<div class="p-16">
			<Navigation
				links={[
					{ title: 'Notes', href: app.notes.toString() },
					{ title: 'Github', href: 'https://github.com/vadirn', blank: true },
					{ title: 'About', href: app.about.toString() },
				] as const}
				logoState={getLogoState()}
			/>
		</div>
	{/snippet}

	{#snippet docs()}
		<Docs />
	{/snippet}
</SplitScreen>
