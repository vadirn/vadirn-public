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
		position: relative;
		grid-column: 3 / span 2;
		padding-right: var(--size-24);
		font-size: var(--font-size-title);
		line-height: var(--line-height-title);
		text-wrap: balance;

		@media (--lg-n-above) {
			grid-column: 3 / span 1;
			color: red;
		}

		&::before {
			position: absolute;
			top: 0;
			bottom: 0;
			left: -32px;
			display: block;
			content: '';
			border-left: var(--size-8) solid var(--color-yellow-300);
		}
	}

	.lead {
		grid-column: 3 / span 2;
		padding-right: var(--size-24);

		@media (--lg-n-above) {
			grid-column: 3 / span 1;
		}
	}

	.notes-title {
		@apply font-bold mb-20;
	}

	.notes {
		@apply col-start-3 col-span-2
			lg:col-start-4 lg:col-span-1
			lg:row-start-2 lg:row-span-2 mb-48;

		&::before {
			@apply absolute hidden lg:block h-full border-r border-yellow-300;

			top: 0;
			bottom: 0;
			margin-left: -23px;
			content: '';
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
		<Pricing labelledby="pricing-plans" />
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
