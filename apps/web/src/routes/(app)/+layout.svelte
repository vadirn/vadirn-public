<script lang="ts">
	import { Navigation } from '@ui/components/navigation';
	import { ThemeSwitcher } from '@ui/components/theme-switcher';
	import { getLogoState } from '$lib/cache/logo-state';
	import { getThemeController } from '$lib/cache/theme-controller';
	import { app } from '$lib/paths/app';
	import { docs } from '$lib/paths/docs';

	const { children } = $props();
	const { nav: navClassName } = __styles();

	const themeController = getThemeController();
</script>

<style lang="postcss">
	.root {
		display: grid;
		grid-template-rows: min-content min-content min-content 1fr;
		grid-template-columns:
			[full-start]
			minmax(0, 1fr)
			[bleed-start]
			minmax(8px, 40px)
			[content-start first-column-start]
			minmax(0, 700px)
			[first-column-end second-column-start]
			minmax(0, 700px)
			[second-column-end content-end]
			minmax(8px, 40px)
			[bleed-end]
			minmax(0, 1fr)
			[full-end];
		grid-auto-rows: min-content;
		row-gap: var(--size-20);
		min-height: var(--height-svh);
		padding-top: var(--size-32);
		margin: auto;

		@media (--gt-tablet) {
			column-gap: var(--size-24);
		}
	}

	:local(.nav) {
		grid-column: content;
		margin-left: calc(-1 * var(--size-32));

		@media (--gt-tablet) {
			grid-column: 3 / span 2;
		}
	}

	footer {
		@apply text-small;

		grid-row: -1 / span 1;
		grid-column: 3/-3;
		place-self:  end;
		padding-bottom: var(--size-16);
	}
</style>

<div class="root">
	<Navigation
		className={navClassName}
		links={[
			{ title: 'Notes', href: app.notes.toString() },
			{ title: 'Github', href: 'https://github.com/vadirn', blank: true },
			{ title: 'LinkedIn', href: 'https://linkedin.com/in/vadirn/', blank: true },
		]}
		logoState={getLogoState()} />

	{@render children?.()}

	<div class="spacer"></div>

	<footer>
		<ul class="flex justify-center items-center gap-16">
			<li><ThemeSwitcher {themeController} /></li>
			<li class="none gt-tablet:block">
				<a href={docs.logo.toString()}>Components</a>
			</li>
		</ul>
	</footer>
</div>
