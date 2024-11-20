<script lang="ts">
	import { Navigation } from '@workspace/components/navigation';
	import { classNames as c } from '@workspace/standard/style';
	import { getLogoState } from '$lib/cache/logo-state';
	import { app } from '$lib/paths/app';
	import { ds } from '$lib/paths/ds';

	const { children } = $props();
</script>

<style lang="postcss">
	.layout {
		@apply min-h-svh grid gap-x-0 gap-y-20 lg:gap-x-24;

		margin: auto;
		grid-template-columns:
			minmax(0, 1fr)
			minmax(8px, 40px)
			minmax(0, 700px)
			minmax(0, 700px)
			minmax(8px, 40px)
			minmax(0, 1fr);
		grid-template-rows: min-content min-content min-content 1fr;
		grid-auto-rows: min-content;
	}

	footer {
		@apply pb-16 text-caption hidden lg:block;

		grid-column: 3/-3;
		grid-row: -1 / span 1;
		place-self:  end;
	}
</style>

<div class="layout">
	<Navigation
		className={c(
			'pt-32 -ml-32',
			'col-start-3 lg:col-span-4',
			'lg:col-start-3 lg:col-span-2',
		)}
		links={[
			{ title: 'Notes', href: app.notes.toString() },
			{ title: 'Github', href: 'https://github.com/vadirn', blank: true },
			{ title: 'About', href: app.about.toString() },
		]}
		logoState={getLogoState()} />

	{@render children()}

	<div class="spacer"></div>

	<footer>
		<ul class="flex gap-16">
			<li><a href={ds.logo.toString()}>Components</a></li>
		</ul>
	</footer>
</div>
