import { browser } from '$app/environment';

const cache = new Map<string, unknown>();

export const Keys = {
	LogoState: 'logo-state',
	Shortcuts: 'shortcuts',
} as const;

/** Get or create cache entry */
export function getOrCreate<T>(key: string, create: () => T): T {
	// only cache in browser
	if (!browser) return create();
	const value = cache.get(key) as T ?? create();

	cache.set(key, value);

	return value;
}

declare global {
	interface Window {
		inspectCache(): Map<string, unknown>;
	}
}

if (browser) {
	window.inspectCache = () => cache;
}
