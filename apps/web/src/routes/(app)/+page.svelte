<script lang="ts">
	import { Modal } from '@ui/components/modal';
	import { type Fn } from '@libs/standard/function';
	import { getNotePath, notes } from '$lib/cache/notes';
	import { app } from '$lib/paths/app';
	import Pricing from '$lib/components/Pricing.svelte';
	import { browser } from '$app/environment';

	const recentNotes = notes.slice(0, 5);
</script>

<style lang="postcss">
	.headline {
		@apply relative pr-24 text-title;

		grid-column: 3 / span 2;
		text-wrap: balance;

		@screen lg {
			grid-column: 3 / span 1;
		}

		&::before {
			@apply absolute block top-0 bottom-0 -left-32
				border-l-8 border-l-solid border-yellow-200;

			content: '';
		}
	}

	.lead {
		@apply pr-24;

		grid-column: 3 / span 2;

		@screen lg {
			grid-column: 3 / span 1;
		}
	}

	.notes-title {
		@apply mb-20 font-bold;
	}

	.notes {
		grid-column: 3 / span 2;

		@screen lg {
			grid-row: 2 / span 2;
			grid-column: 4 / span 1;
		}

		&::before {
			@apply absolute bottom-0 hidden h-full -ml-23px
				border-r-1 border-r-solid border-yellow-200;

			content: '';

			@screen lg {
				display: block;
			}
		}
	}
</style>

<h1 class="headline">
	Frontend <b>Tech Lead</b>:<br/>
	<b>Transforming</b> Legacy&nbsp;Code&nbsp;&
	<b>Enhancing</b> Dev&nbsp;Experience
</h1>

<div class="lead">
	<p class="mb-20">
		With over a decade of frontend expertise,
		I specialize in transforming legacy codebases
		and crafting maintainable systems from the ground up.
		Let's work on turning gradual decay into continuous improvement,
		ensuring long-term success for your projects.
	</p>

	<Modal isBrowser={browser} isVisible={true} labelledby="pricing-plans">
		{#snippet trigger(setVisibility: Fn<void, [Event, boolean]>)}
			<button
				onclick={(event) => { setVisibility(event, true); }}
			>
				Get a quote
			</button>
		{/snippet}
		{#snippet body(setVisibility: Fn<void, [Event, boolean]>)}
			<Pricing labelledby="pricing-plans" {setVisibility} />
		{/snippet}
	</Modal>

</div>

<div class="notes">
	<h2 class="notes-title">Recent notes:</h2>
	<ul class="list-disc pl-24 mb-20">
		{#each recentNotes as title}
			<li >
				<a href={getNotePath(title.toLowerCase())}>{title}</a>
			</li>
		{/each}
	</ul>
	<a href={app.notes.toString()}>View all notes</a>
</div>
