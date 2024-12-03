<script lang="ts">
	import { classNames as c } from '@libs/standard/style';
	import { Logo, type LogoState } from '../Logo';
	import type { NavigationLink } from './types';

	const { links = [], logoState, className }: {
		links?: NavigationLink[];
		logoState: LogoState;
		className?: string;
	} = $props();

	const blankProps = { target: '_blank', rel: 'noopener noreferrer' };
</script>

<nav class={c(className)}>
	<Logo {logoState} />
	<ul class="ml-32 pt-4 flex gap-16 font-sans">
		{#each links as link}
			<li>
				<a
					href={link.href}
					{...(link.blank && blankProps)}>{link.title}</a>
			</li>
		{/each}
	</ul>
</nav>
