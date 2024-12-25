<script lang="ts">
	import Shortcut from '../Shortcut/Shortcut.svelte';
	import {
		Themes,
		type ThemeControllerInstance,
	} from './theme-controller.svelte';

	type Props = {
		themeController: ThemeControllerInstance;
	};

	const { themeController }: Props = $props();

	const label = $derived({
		[Themes.Light]: 'Switch to Dark',
		[Themes.Dark]: 'Switch to System',
		[Themes.System]: 'Switch to Light',
	}[themeController.state]);
</script>

<style lang="postcss">
	button {
		@apply h-auto py-4 px-8;
	}
</style>

<button onclick={themeController.toggle}>{label} <Shortcut keys="d" /></button>
