<script lang="ts">
	import { shortcuts } from '@libs/shortcuts';
	import { isEditingText } from '@libs/standard/dom';
	import { stateController } from '@libs/state-controller';
	import { getThemeController } from '$lib/cache/theme-controller';
	import { getLogoState } from '$lib/cache/logo-state';
	import { onNavigate } from '$app/navigation';
	import '@ui/theme/css';

	const { children } = $props();

	const logoState = getLogoState();
	onNavigate(logoState.updateIndex);

	const keyboardNavigating = stateController('idle', {
		idle: {
			startNavigating: () => {
				keyboardNavigating.state = 'navigating';
			},
		},
		navigating: {
			stopNavigating: () => {
				keyboardNavigating.state = 'idle';
			},
		},
	});

	const themeController = getThemeController();

	const onkeydown = shortcuts({
		'd': (event) => {
			if (isEditingText(event)) return;

			themeController.toggle();
		},
		'tab': () => {
			keyboardNavigating.startNavigating();
		},
		'shift+tab': () => {
			keyboardNavigating.startNavigating();
		},
	});

	const onmousedown = () => {
		keyboardNavigating.stopNavigating();
	};

	$effect(() => {
		if (keyboardNavigating.state === 'navigating') {
			document.body.classList.add('focus-visible');

			return;
		}

		document.body.classList.remove('focus-visible');
	});

	$effect(() => {
		if (themeController.inDarkMode) {
			document.documentElement.classList.add('dark');

			return;
		}

		document.documentElement.classList.remove('dark');
	});

</script>

<svelte:document {onkeydown} {onmousedown} />

{@render children?.()}
