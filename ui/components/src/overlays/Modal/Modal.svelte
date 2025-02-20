<script lang="ts">
	import type { Fn } from '@libs/standard/function';
	import type { Snippet } from 'svelte';

	type Props = {
		body: Snippet<[{
			setModalVisibility: Fn<void, [isVisible: boolean]>;
		}]>;
		trigger?: Snippet<[setModalVisibility: Fn<void, [isVisible: boolean]>]>;
		isVisible?: boolean;
	};

	let {
		trigger,
		body,
		isVisible = $bindable(false),
	}: Props = $props();

	async function setModalVisibility(value: boolean) {
		if (isVisible === value) return;
		isVisible = value;
	}

	let element: HTMLDialogElement | undefined = $state();

	// Add event listener for dialog close
	function handleClose() {
		setModalVisibility(false);
	}

	$effect(() => {
		if (isVisible) {
			element?.showModal();
		}
		else {
			element?.close();
		}
	});
</script>

<style lang="postcss">
	dialog {
		inset: 0;
		max-width: 102ch;
		margin: auto;
		color: inherit;
		background-color: var(--color-background);
		border: none;
		border-radius: var(--radius-8);
		box-shadow: var(--shadow-modal);
	}

	dialog::backdrop {
		background-color: var(--color-grey-900);
		opacity: 0.5;
	}
</style>

{@render trigger?.(setModalVisibility)}

<dialog bind:this={element} onclose={handleClose}>
	{#if isVisible}
		{@render body?.({ setModalVisibility })}
	{/if}
</dialog>
