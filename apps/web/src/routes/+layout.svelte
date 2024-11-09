<script lang="ts">
	import { getLogoState } from '$lib/cache/logo-state';
	import { onNavigate } from '$app/navigation';
	import '@workspace/theme/css/app.css';

	const { children } = $props();

	const logoState = getLogoState();
	onNavigate(logoState.updateIndex);
</script>

{@render children()}
