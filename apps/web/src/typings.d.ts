declare module '*.md' {
	import { SvelteComponent } from 'svelte';

	export default class MarkdownComponent extends SvelteComponent {}
}

declare function __styles(): Record<string, string>;
