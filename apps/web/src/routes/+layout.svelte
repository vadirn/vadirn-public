<script lang="ts">
	import { shortcuts } from '@libs/shortcuts';
	import { isEditingText } from '@libs/standard/dom';
	import { stateController } from '@libs/state-controller';
	import { Meta } from '@ui/components/meta';
	import inter from '@ui/theme/assets/fonts/InterVariable.woff2?url';
	import interItalic from
		'@ui/theme/assets/fonts/InterVariable-Italic.woff2?url';
	import { getThemeController } from '$lib/cache/theme-controller';
	import { getRootMeta } from '$lib/cache/meta';
	import { getLogoState } from '$lib/cache/logo-state';
	import { page } from '$app/state';
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

<svelte:head>
	<link
		as="font"
		crossorigin="anonymous"
		href={inter}
		rel="preload"
		type="font/woff2"
	/>
	<link
		as="font"
		crossorigin="anonymous"
		href={interItalic}
		rel="preload"
		type="font/woff2"
	/>
</svelte:head>

<Meta {...getRootMeta({ canonical: page.url.href })} />

<svelte:document {onkeydown} {onmousedown} />

{@render children?.()}
