<script lang="ts">
	import { Navigation } from '@workspace/components/navigation';
	import { getLogoState } from '$lib/cache/logo-state';
	import { app } from '$lib/paths/app';
	import { ds } from '$lib/paths/ds';

	const { children } = $props();
</script>

<style lang="postcss">
	.layout {
		@apply min-h-svh lg:grid;

		max-width: 1400px;
		margin: auto;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto auto 1fr;
	}

	footer {
		@apply px-32 pb-16 text-caption hidden lg:block;

		grid-column: 1/-1;
		grid-row: 3/4;
		place-self: end;
	}
</style>

<div class="layout">
	<Navigation className="p-32 row-start-1 col-start-1 col-end-2 " links={[
		{ title: 'Notes', href: app.notes.toString() },
		{ title: 'Github', href: 'https://github.com/vadirn', blank: true },
		{ title: 'About', href: app.about.toString() },
	]} logoState={getLogoState()} />

	{@render children()}

	<footer>
		<ul class="flex gap-16">
			<li><a href={ds.logo.toString()}>Components</a></li>
		</ul>
	</footer>
</div>
