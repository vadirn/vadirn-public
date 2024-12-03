<script lang="ts">
	import { Layers, portal } from '@ui/actions/portal';

	const { children } = $props();
</script>

<div class="modal" use:portal={Layers.Modals}>
	{@render children()}
</div>
