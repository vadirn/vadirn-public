<script lang="ts">
	import { getNormalizedKeys } from '@libs/shortcuts';

	type Props = {
		keys: string;
	};

	const { keys }: Props = $props();

	const _keys = getNormalizedKeys(keys);

	function formatKey(key: string) {
		// depending on os, for now only macos formatting
		return {
			cmd: '⌘',
			shift: '⇧',
			alt: '⌥',
			ctrl: '⌃',
			meta: '⌘',
		}[key] ?? key.toUpperCase();
	}

	const formattedShortcut = _keys.map(formatKey).join('+');
</script>

<style lang="postcss">
	.shortcut {
		display: flex;
		align-items: center;
	}

	kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--size-16);
		aspect-ratio: 1/1;
		line-height: 1;
		color: var(--color-grey-900);
		background-color: var(--color-grey-50);
		border-radius: var(--radius-4);

		.dark & {
			background-color: var(--color-grey-400);
		}
	}

	.separator {
		@apply inline-flex items-center justify-center w-16;

		aspect-ratio: 1/1;
		line-height: 1;
	}
</style>

<span class="shortcut" title="Keyboard shortcut: {formattedShortcut}">
	{#each _keys as key, i}
		<kbd>{formatKey(key)}</kbd>
		{#if i < _keys.length - 1}
			<span class="separator">&plus;</span>
		{/if}
	{/each}
</span>
