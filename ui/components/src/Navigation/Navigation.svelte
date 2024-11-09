<script lang="ts">
	import { Logo, type LogoState } from '../Logo';
	import type { NavigationLink } from './types';

	const { links = [], logoState }: {
		links?: NavigationLink[];
		logoState: LogoState;
	} = $props();
	const blankProps = { target: '_blank', rel: 'noopener noreferrer' };
</script>

<Logo {logoState} />
<ul class="ml-32 pt-4 flex gap-16 font-sans">
	{#each links as link}
		<li>
			<a href={link.href} {...(link.blank && blankProps)}>{link.title}</a>
		</li>
	{/each}
</ul>
