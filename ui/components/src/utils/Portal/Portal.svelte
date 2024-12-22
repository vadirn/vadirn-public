<script lang="ts">
	import { portal } from '@ui/actions/portal';

	const { children, className = '' } = $props();
</script>

<div class={className} use:portal>
	{@render children?.()}
</div>
