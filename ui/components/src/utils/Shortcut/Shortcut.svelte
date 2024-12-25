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
		@apply flex items-center;
	}

	kbd {
		@apply inline-flex items-center justify-center
			text-inherit bg-grey-50 dark:bg-grey-400 rounded-4 w-16;

		aspect-ratio: 1/1;
		line-height: 1;
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
