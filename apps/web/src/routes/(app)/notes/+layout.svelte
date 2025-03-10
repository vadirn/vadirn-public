<script lang="ts">
	import { Meta } from '@ui/components/meta';
	import { getMeta, notesCardUrl } from '$lib/cache/meta';

	const { children } = $props();
</script>

<style lang="postcss">
	main {
		--line-height: var(--line-height-heading);

		display: grid;
		grid-template-columns: subgrid;
		grid-column: full;
		grid-auto-rows: min-content;
		margin-bottom: var(--size-48);
		line-height: var(--line-height);
		tab-size: 4;

		--max-width: min(720px, 100%);
	}

	main :global(*:not(code)) {
		grid-column: content;
		max-width: var(--max-width);
	}

	main :global(p),
	main :global(ul),
	main :global(table),
	main :global(h1),
	main :global(h2) {
		margin-bottom: var(--line-height);
	}

	main :global(h1:not(:first-child)),
	main :global(h2:not(:first-child)) {
		margin-top: var(--line-height);
	}

	main :global(h1) {
		font-size: var(--font-size-title);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-title);
		letter-spacing: var(--letter-spacing-tight);
	}

	main :global(h2) {
		font-size: var(--font-size-heading);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-heading);
	}

	main :global(ul) {
		padding-left: var(--size-24);
		list-style-type: disc;
	}

	main :global(.callout) {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: full;
		grid-auto-rows: min-content;
		padding-top: var(--line-height);
		margin-bottom: var(--line-height);
		background-color: var(--color-yellow-50);

		:global(*) {
			grid-column: content;
		}
	}

	:global(.dark) main :global(.callout) {
		background-color: var(--color-yellow-700);
	}

	main :global(table) {
		--table-border: var(--line-width-1) solid var(--color-grey-200);

		font-size: var(--font-size-small);
		line-height: var(--line-height-small);
		color: var(--color-black);
		border-collapse: collapse;
		background-color: var(--color-grey-50);
		border: var(--table-border);
	}

	:global(.dark) main :global(table) {
		--table-border: var(--line-width-1) solid var(--color-grey-400);

		background-color: var(--color-grey-200);
	}

	main :global(th) {
		padding: var(--size-4);
		font-weight: var(--font-weight-bold);
		text-align: left;
		text-transform: uppercase;
		letter-spacing: var(--letter-spacing-wide);
		border: var(--table-border);
	}

	main :global(td) {
		padding: var(--size-2) var(--size-4);
		vertical-align: top;
		border: var(--table-border);
	}

	main :global(:not(pre) > code) {
		display: inline-block;
		padding: var(--size-2) var(--size-4);
		margin-block: var(--size-1);
		font-size: var(--font-size-mono);
		line-height: 1em;
		color: var(--color-black);
		background-color: var(--color-grey-100);
		border-radius: var(--radius-4);

	}

	main :global(.dark) :global(:not(pre) > code) {
		background-color: var(--color-grey-200);
	}

	main :global(.code) {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: full;
		padding-top: var(--line-height);
		margin-bottom: var(--line-height);
		background-color: var(--color-grey-50);

		:global(*) {
			grid-column: content;
		}
	}

	:global(.dark) main :global(.code) {
		background-color: var(--color-grey-700);
	}

	main :global(pre) {
		width: 100%;
		padding: var(--size-8);
		margin-bottom: var(--line-height);
		overflow-x: scroll;
		overscroll-behavior-x: contain;
		background-color: var(--color-grey-100);
		border-radius: var(--radius-8);
	}

	main :global(pre code) {
		display: block;
		width: max-content;
		padding-inline-end: var(--size-4);
		font-size: var(--font-size-mono);
		line-height: var(--line-height-body);
		color: var(--color-black);

		@media (--gt-tablet) {
			margin-bottom: 0;
		}
	}
</style>

<Meta
	{...getMeta({
		openGraph: { image: notesCardUrl },
		twitter: { image: notesCardUrl },
	})}
/>

<main>
	{@render children?.()}
</main>
