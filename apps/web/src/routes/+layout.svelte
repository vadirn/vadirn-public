<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { shortcuts } from '@libs/shortcuts';
	import { isEditingText } from '@libs/standard/dom';
	import { stateController } from '@libs/state-controller';
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

	const onkeydown = shortcuts({
		'd': (event) => {
			if (isEditingText(event)) return;

			const value = localStorage.getItem('theme');

			if (value === 'dark') {
				localStorage.removeItem('theme');
				document.documentElement.classList.remove('dark');

				return;
			}

			localStorage.setItem('theme', 'dark');
			document.documentElement.classList.add('dark');
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

	const darkMode = new MediaQuery('(prefers-color-scheme: dark)');

	$effect(() => {
		if (darkMode.current) {
			document.documentElement.classList.add('dark');

			return;
		}

		document.documentElement.classList.remove('dark');
	});

</script>

<svelte:document {onkeydown} {onmousedown} />

{@render children?.()}
