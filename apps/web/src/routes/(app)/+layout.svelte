<script lang="ts">
	import { Navigation } from '@workspace/components/navigation';
	import { getLogoState } from '$lib/cache/logo-state';
	import { app } from '$lib/paths/app';

	const { children } = $props();
</script>

<Navigation className="p-32" links={[
	{ title: 'Notes', href: app.notes.toString() },
	{ title: 'Github', href: 'https://github.com/vadirn', blank: true },
	{ title: 'About', href: app.about.toString() },
]} logoState={getLogoState()} />

{@render children()}
