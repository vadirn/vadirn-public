<script lang="ts">
	import Button from '../../forms/Button/Button.svelte';
	import Shortcut from '../Shortcut/Shortcut.svelte';
	import {
		Themes,
		type ThemeControllerInstance,
	} from './theme-controller.svelte';

	type Props = {
		isBrowser: boolean;
		themeController: ThemeControllerInstance;
	};

	const { themeController, isBrowser }: Props = $props();

	const nextTheme = $derived({
		[Themes.Light]: 'Dark',
		[Themes.Dark]: 'System',
		[Themes.System]: 'Light',
	}[themeController.state]);

	const currentTheme = $derived({
		[Themes.Light]: 'Light',
		[Themes.Dark]: 'Dark',
		[Themes.System]: 'System',
	}[themeController.state]);
</script>

{#if isBrowser}
	<Button size="small" onclick={themeController.toggle}>
		{currentTheme} &rarr; {nextTheme}
		<Shortcut keys="d" />
	</Button>
{/if}
