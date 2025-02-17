<script lang="ts">
	import { Logo, type LogoState } from '../Logo';
	import type { NavigationLink } from './types';

	const { links = [], logoState, className }: {
		links?: NavigationLink[];
		logoState: LogoState;
		className?: string | Record<string, boolean>;
	} = $props();

	const blankProps = { target: '_blank', rel: 'noopener noreferrer' };
</script>

<style lang="postcss">
	ul {
		display: flex;
		gap: var(--size-16);
		padding-top: var(--size-4);
		margin-left: var(--size-32);
	}
</style>

<nav class={className}>
	<Logo {logoState} />
	<ul>
		{#each links as link}
			<li>
				<a
					href={link.href}
					{...(link.blank && blankProps)}>{link.title}</a>
			</li>
		{/each}
	</ul>
</nav>
