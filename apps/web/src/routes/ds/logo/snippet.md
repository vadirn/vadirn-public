
```svelte
<script lang="ts">
	import { Logo } from '@workspace/components/logo';
	import { getLogoState } from '$lib/cache/logo-state';
</script>

<Logo logoState={getLogoState()} />
```