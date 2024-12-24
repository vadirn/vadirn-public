<script lang="ts">
	import { shortcuts } from '@libs/shortcuts';
	import { isNil } from '@libs/standard/common';
	import { getFocusableElements } from '@libs/standard/dom';
	import { assertFalse } from '@libs/standard/error';
	import { getLayer, Layers, portal } from '@ui/actions/portal';
	import { tick, type Snippet } from 'svelte';
	import type { Fn } from '@libs/standard/function';

	type Props = {
		body?: Snippet<[Fn<void, [Event, boolean]>]>;
		trigger?: Snippet<[Fn<void, [Event, boolean]>]>;
		isBrowser?: boolean;
		labelledby: string;
		isVisible?: boolean;
	};

	// https://github.com/svelftejs/eslint-plugin-svelte/issues/818
	let {
		body,
		trigger,
		isBrowser,
		labelledby,
		isVisible = $bindable(false),
	}: Props = $props();

	let element: HTMLElement | undefined = $state();

	assertFalse(
		isVisible && isBrowser === undefined,
		'The isBrowser property should be set when '
			+ 'creating a modal with isVisible = true',
	);

	async function setVisibility(event: Event, value: boolean) {
		// prevent bubbling, so that $effect doesn't take over the click
		event.stopPropagation();
		isVisible = value;
		await tick();
		const modalLayer = getLayer(Layers.Modals);

		if (modalLayer && isVisible) {
			modalLayer.scrollTop = 0;
		}
	}

	const closeOnClickOutside = (event: MouseEvent) => {
		if (element && !element.contains(event.target as Node)) {
			isVisible = false;
		}
	};

	const onkeydown = shortcuts({
		'esc': () => {
			isVisible = false;
		},
		// take over focus management and pick focusable elements manually
		// makes Safari behave consistently with other browsers
		'tab': (event) => {
			if (isNil(element)) return;
			event.preventDefault();

			const activeElement = document.activeElement as HTMLElement;
			const focusableElements = getFocusableElements(element);
			const currentIndex = focusableElements.indexOf(activeElement);

			if (
				currentIndex === -1
				|| currentIndex === focusableElements.length - 1
			) {
				activeElement?.blur();
				focusableElements[0]?.focus();

				return;
			}

			focusableElements[currentIndex + 1]?.focus();
		},
		'shift+tab': (event) => {
			if (isNil(element)) return;
			event.preventDefault();

			const activeElement = document.activeElement as HTMLElement;
			const focusableElements = getFocusableElements(element);
			const currentIndex = focusableElements.indexOf(activeElement);

			if (
				currentIndex === -1
				|| currentIndex === 0
			) {
				activeElement?.blur();
				focusableElements[focusableElements.length - 1]?.focus();

				return;
			}

			focusableElements[currentIndex - 1]?.focus();
		},
	});

	$effect(() => {
		if (isVisible) {
			(document.activeElement as HTMLElement)?.blur();
			document.addEventListener('keydown', onkeydown);
			document.addEventListener('pointerdown', closeOnClickOutside);
			document.body.classList.add('overflow-hidden');
		}

		return () => {
			document.removeEventListener('keydown', onkeydown);
			document.removeEventListener('pointerdown', closeOnClickOutside);
			document.body.classList.remove('overflow-hidden');
		};
	});
</script>

{@render trigger?.(setVisibility)}

{#if isVisible && isBrowser}
	<div
		bind:this={element}
		class="flex-none m-auto"
		aria-labelledby={labelledby}
		role="dialog"
		use:portal={Layers.Modals}
	>
		{@render body?.(setVisibility)}
	</div>
{/if}
