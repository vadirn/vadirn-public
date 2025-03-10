<script lang="ts">
	import { type Fn } from '@libs/standard/function';
	import { Button } from '@ui/components/button';
	import { Modal } from '@ui/components/modal';
	import { getNotePath, notes } from '$lib/cache/notes';
	import Pricing from '$lib/components/Pricing/Pricing.svelte';
	import { app } from '$lib/paths/app';

	const RECENT_NOTES_COUNT = 5;

	const recentNotes = notes.slice(0, RECENT_NOTES_COUNT);
</script>

<style lang="postcss">
	.title {
		position: relative;
		grid-column: content;
		padding-right: var(--size-24);
		letter-spacing: var(--letter-spacing-tight);
		text-wrap: balance;

		@media (--gt-tablet) {
			grid-column: first-column;
		}

		&::before {
			position: absolute;
			top: 0;
			bottom: 0;
			left: calc(-1 * var(--size-32));
			display: block;
			content: '';
			border-left: var(--line-width-8) solid var(--color-yellow-200);
		}
	}

	.lead {
		grid-column: content;
		padding-right: var(--size-24);

		@media (--gt-tablet) {
			grid-column: first-column;
		}
	}

	.notes-title {
		margin-bottom: var(--size-20);
		font-weight: var(--font-weight-bold);
	}

	.notes {
		grid-column: content;

		@media (--gt-tablet) {
			grid-row: 2 / span 2;
			grid-column: second-column;
		}

		&::before {
			position: absolute;
			top: 0;
			display: none;
			height: 100%;
			margin-left: calc(-1*var(--size-24) + 1px);
			content: '';
			border-right: var(--line-width-1) solid var(--color-yellow-200);

			@media (--gt-tablet) {
				display: block;
			}
		}
	}

	.notes-list {
		padding-left: var(--size-24);
		margin-bottom: var(--line-height-body);
		list-style-type: disc;
	}
</style>

<h1 class="title text-title">
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

	<Modal>
		{#snippet trigger(setModalVisibility: Fn<void, [boolean]>)}
			<Button
				type="button"
				onclick={() => { setModalVisibility(true); }}
			>
				Get a quote
			</Button>
		{/snippet}
		{#snippet body({ setModalVisibility })}
			<Pricing
				labelledby="pricing-plans"
				{setModalVisibility}
			/>
		{/snippet}
	</Modal>

</div>

<div class="notes">
	<h2 class="notes-title">Recent notes:</h2>
	<ul class="notes-list">
		{#each recentNotes as title, idx (idx)}
			<li>
				<a href={getNotePath(title.toLowerCase())}>{title}</a>
			</li>
		{/each}
	</ul>
	<a href={app.notes.toString()}>View all notes</a>
</div>
