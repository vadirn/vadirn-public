<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: string;
		size?: 'small';
	} & HTMLButtonAttributes;

	const {
		children,
		class: className,
		size,
		...props
	}: Props = $props();
</script>

<style lang="postcss">
	button {
		display: inline-flex;
		gap: var(--size-8);
		align-items: center;
		justify-content: center;
		min-height: var(--size-32);
		padding-inline: var(--size-16);
		font: inherit;
		cursor: default;
		border: none;
		border-radius: var(--radius-full);
	}

	.small {
		min-height: var(--size-24);
		padding-inline: var(--size-8);
	}
</style>

<button
	class={[className, 'interactive']}
	class:small={size === 'small'}
	class:variant-primary={props.type === 'submit'}
	{...props}
>
	{@render children?.()}
</button>
