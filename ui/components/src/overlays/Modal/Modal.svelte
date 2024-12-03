<script lang="ts">
	import { Layers, portal } from '@ui/actions/portal';
	import { shortcuts } from '@libs/shortcuts';

	// https://github.com/sveltejs/eslint-plugin-svelte/issues/818
	let { children, trigger, isVisible = $bindable(false) } = $props();
	let element: HTMLElement | undefined = $state();

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
		esc: () => {
			isVisible = false;
		},
	});

	$effect(() => {
		if (isVisible) {
			document.addEventListener('keydown', onkeydown);
			document.addEventListener('click', closeOnClickOutside);
		}

		return () => {
			document.removeEventListener('keydown', onkeydown);
			document.removeEventListener('click', closeOnClickOutside);
		};
	});
</script>

{@render trigger?.(setVisibility)}

{#if isVisible}
	<div
		bind:this={element}
		class="modal"
		aria-modal="true"
		role="dialog"
		use:portal={Layers.Modals}
	>
		{@render children()}
	</div>
{/if}
