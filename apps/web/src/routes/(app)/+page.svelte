<script lang="ts">
	import { note, notes } from '$lib/cache/notes';
	import { app } from '$lib/paths/app';

	const recentNotes = notes.slice(0, 5);
</script>

<style lang="postcss">
	.headline {
		@apply text-title relative pr-24
			col-start-3 col-span-2
			lg:col-start-3 lg:col-span-1;

		&::before {
			@apply absolute block border-l-8 border-accent;

			content: '';
			top: 0;
			bottom: 0;
			left: -32px;
		}
	}

	.lead {
		@apply pr-24
			col-start-3 col-span-2
			lg:col-start-3 lg:col-span-1;
	}

	.notes-title {
		@apply font-bold mb-20;
	}

	.notes {
		@apply col-start-3 col-span-2
			lg:col-start-4 lg:col-span-1
			lg:row-start-2 lg:row-span-2;

		&::before {
			@apply absolute hidden lg:block h-full border-r border-accent;

			content: '';
			top: 0;
			bottom: 0;
			margin-left: -23px;
		}
	}
</style>

<h1 class="headline">
	Frontend <b>Tech Lead</b>:<br/>
	<b>Transforming</b> Legacy&nbsp;Code&nbsp;&<br/>
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
	<button>Get a quote</button>
</div>

<div class="notes">
	<h2 class="notes-title">Recent notes:</h2>
	<ul class="list-disc pl-24 mb-20">
		{#each recentNotes as title}
			<li >
				<a href={note(title.toLowerCase())}>{title}</a>
			</li>
		{/each}
	</ul>
	<a href={app.notes.toString()}>View all notes</a>
</div>
