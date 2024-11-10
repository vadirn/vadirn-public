- `LogoState` contains logic related to picking emoji to display:

```ts
const emoji = [
	'👨‍💻', '⛷️', '🎾', '👾',
] as const;

export class LogoState {
	index: number = $state(0);
	emoji: string = $derived.by(() => emoji[this.index] as string);

	updateIndex = () => {
		this.index = (this.index + 1) % emoji.length;
		console.log(this.index, this.emoji);
	};
}
```

- `LogoState` is external to keep it independent from the component lifecycle. 
- Since we can't have shared state on the server side, we need to check whether `LogoState` is being created in the browser:

```ts
import { browser } from '$app/environment';

const cache = new Map<string, unknown>();

export const Keys = {
	LogoState: 'logo-state',
} as const;

/** Get or create cache entry */
export function getOrCreate<T>(key: string, create: () => T): T {
	// only cache in browser
	if (!browser) return create();
	const value = cache.get(key) as T ?? create();

	cache.set(key, value);

	return value;
}
```

```svelte
<script lang="ts">
	import { Logo } from '@workspace/components/logo';
	import { getLogoState } from '$lib/cache/logo-state';
</script>

<Logo logoState={getLogoState()} />
```