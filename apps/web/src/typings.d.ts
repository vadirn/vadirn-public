declare module '*.md' {
	export { SvelteComponentDev as default } from 'svelte/internal';
}

declare function __styles(): Record<string, string>;
