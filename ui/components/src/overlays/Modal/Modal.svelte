<script lang="ts">
	import { Layers, portal } from '@ui/actions/portal';
	import { shortcuts } from '@libs/shortcuts';
	import { assertFalse } from '@libs/standard/error';
	import { getFocusableElements } from '@libs/standard/dom';
	import { isNil, notNil } from '@libs/standard/common';
	import type { Snippet } from 'svelte';
	import type { Fn } from '@libs/standard/function';

	// https://github.com/svelftejs/eslint-plugin-svelte/issues/818
	let {
		children,
		trigger,
		isBrowser,
		labelledby,
		isVisible = $bindable(false),
	}: {
		children: Snippet;
		trigger?: Snippet<[Fn<void, [Event, boolean]>]>;
		isBrowser?: boolean;
		labelledby: string;
		isVisible?: boolean;
	} = $props();

	let element: HTMLElement | undefined = $state();

	assertFalse(
		isVisible && isBrowser === undefined,
		'The isBrowser property should be set when '
			+ 'creating a modal with isVisible = true',
	);

	function setVisibility(event: Event, value: boolean) {
		// prevent bubbling, so that $effect doesn't take over the click
		event.stopPropagation();
		isVisible = value;
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
		'tab': (event) => {
			if (isNil(element)) return;
			const activeElement = document.activeElement as HTMLElement;

			const focusableElements = getFocusableElements(element);
			const firstFocusableElement = focusableElements[0];
			const lastFocusableElement = focusableElements[
				focusableElements.length - 1
			];

			if (!element.contains(activeElement)) {
				event.preventDefault();
				if (notNil(firstFocusableElement)) {
					firstFocusableElement.focus();

					return;
				}
				activeElement?.blur();
			}

			if (activeElement !== lastFocusableElement) return;

			event.preventDefault();
			firstFocusableElement?.focus();
		},
		'shift+tab': (event) => {
			if (isNil(element)) return;
			const activeElement = document.activeElement as HTMLElement;

			const focusableElements = getFocusableElements(element);
			const firstFocusableElement = focusableElements[0];
			const lastFocusableElement = focusableElements[
				focusableElements.length - 1
			];

			if (!element.contains(activeElement)) {
				event.preventDefault();
				if (notNil(lastFocusableElement)) {
					lastFocusableElement.focus();

					return;
				}
				activeElement?.blur();
			}

			if (activeElement !== firstFocusableElement) return;

			event.preventDefault();
			lastFocusableElement?.focus();
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
		class="p-24 flex-none m-auto"
		aria-labelledby={labelledby}
		role="dialog"
		use:portal={Layers.Modals}
	>
		{@render children()}
	</div>
{/if}
