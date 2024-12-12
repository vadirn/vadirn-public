<script lang="ts">
	import { Navigation } from '@ui/components/navigation';
	import { getLogoState } from '$lib/cache/logo-state';
	import { app } from '$lib/paths/app';
	import { ds } from '$lib/paths/ds';

	const { children } = $props();
	const { nav: navClassName } = __styles();
</script>

<style lang="postcss">
	.layout {
		display: grid;
		grid-template-rows: min-content min-content min-content 1fr;
		grid-template-columns:
			minmax(0, 1fr)
			minmax(8px, 40px)
			minmax(0, 700px)
			minmax(0, 700px)
			minmax(8px, 40px)
			minmax(0, 1fr);
		grid-auto-rows: min-content;
		gap: var(--size-20) 0;
		min-height: 100svh;
		padding-top: var(--size-32);
		margin: auto;

		@media (--lg-n-above) {
			column-gap: var(--size-24);
		}
	}

	:local(.nav) {
		grid-column: 3 / span 4;
		margin-left: calc(-1 * var(--size-32));

		@media (--lg-n-above) {
			grid-column: 3 / span 2;
		}
	}

	footer {
		display: none;
		grid-row: -1 / span 1;
		grid-column: 3/-3;
		place-self:  end;
		padding-bottom: var(--size-16);
		font-size: var(--font-size-caption);
		line-height: var(--line-height-caption);

		@media (--lg-n-above) {
			display: block;
		}
	}
</style>

<div class="layout">
	<Navigation
		className={navClassName}
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
