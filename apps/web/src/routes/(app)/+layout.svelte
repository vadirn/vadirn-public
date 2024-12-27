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
	.layout {
		@apply grid gap-y-20 min-h-svh pt-32 m-auto;

		grid-template-rows: min-content min-content min-content 1fr;
		grid-template-columns:
			minmax(0, 1fr)
			minmax(8px, 40px)
			minmax(0, 700px)
			minmax(0, 700px)
			minmax(8px, 40px)
			minmax(0, 1fr);
		grid-auto-rows: min-content;

		@screen lg {
			@apply gap-x-24;
		}
	}

	:local(.nav) {
		@apply -ml-32;

		grid-column: 3 / span 4;

		@screen lg {
			grid-column: 3 / span 2;
		}
	}

	footer {
		@apply pb-16 text-small;

		grid-row: -1 / span 1;
		grid-column: 3/-3;
		place-self:  end;
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

	{@render children?.()}

	<div class="spacer"></div>

	<footer>
		<ul class="flex justify-center items-center gap-16">
			<li><ThemeSwitcher {themeController} /></li>
			<li class="hidden lg:block">
				<a href={docs.logo.toString()}>Components</a>
			</li>
		</ul>
	</footer>
</div>
