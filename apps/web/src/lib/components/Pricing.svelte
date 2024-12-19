<script lang="ts">
	import { Field } from '@ui/components/field';
	const { labelledby }: { labelledby: string } = $props();
</script>

<style lang="postcss">
	.modal {
		@apply w-full p-inline-16 pb-24 bg-background rounded-8 shadow-modal;
	}

	.pricing {
		@apply flex flex-col gap-16 mb-16;

		@screen lg {
			@apply flex-row;
		}

		div {
			@apply relative flex items-stretch;

			min-width: 200px;
		}
	}

	h2 {
		@apply text-heading font-bold;

		text-wrap: balance;
	}

	.plan-radio {
		@apply absolute opacity-0;
	}

	.plan-label {
		@apply flex flex-auto flex-col p-16 pt-8 rounded-4 interactive;
	}

	.plan-radio:checked + .plan-label {
		@apply interactive-selected;
	}

	.plan-title {
		@apply flex gap-8 items-center min-h-40 mb-20 font-bold;

		white-space: balance;
	}

	.plan-features {
		flex: 1 1 auto;
		margin-bottom: var(--size-20);
		font-size: var(--font-size-caption);
		line-height: var(--line-height-caption);
	}

	.icon-select {
		@apply relative block w-16 h-16 border border-current rounded-full;
	}

	.plan-radio:checked + .plan-label .icon-select {
		&::before {
			@apply block absolute inset-[3px] bg-current rounded-full;

			content: '';
		}
	}

	.plan-radio:focus-visible + .plan-label {
		@apply ring-2 ring-offset-2 ring-blue-500 ring-offset-background;
	}
</style>

<form class="modal">
	<h2 id={labelledby} class="mb-16">Get a Quote</h2>
	<p class="mb-8">Choose a tier that best suits your needs:</p>
	<div class="pricing">
		<div>
			<input
				id="plan-basic"
				name="plan"
				class="plan-radio"
				type="radio"
				value="basic"
			/>
			<label class="plan-label colorize" for="plan-basic">
				<h3 class="plan-title">
					<i class="icon-select"></i>
					Basic Consult
				</h3>

				<ul class="plan-features">
					<li>Code review,</li>
					<li>Architecture assessment,</li>
					<li>Recommendations for legacy code transformation</li>
				</ul>

				<p class="plan-price">$5,000 - $15,000</p>
			</label>
		</div>
		<div>
			<input
				id="plan-comprehensive"
				name="plan"
				class="plan-radio"
				type="radio"
				value="comprehensive"
			/>
			<label class="plan-label colorize" for="plan-comprehensive">
				<h3 class="plan-title">
					<i class="icon-select"></i>
					Legacy Revamp
				</h3>

				<ul class="plan-features">
					<li>In-depth analysis,</li>
					<li>Refactoring plan,</li>
					<li>Implementation guidance, and developer training</li>
				</ul>

				<p class="plan-price">$20,000 - $50,000+</p>
			</label>
		</div>
		<div>
			<input
				id="plan-ongoing"
				name="plan"
				class="plan-radio"
				type="radio"
				value="ongoing"
			/>
			<label class="plan-label colorize" for="plan-ongoing">
				<h3 class="plan-title">
					<i class="icon-select"></i>
					Continuous Consult
				</h3>

				<ul class="plan-features">
					<li>Regular meetings,</li>
					<li>Code reviews,</li>
					<li>Continuous guidance to ensure project success</li>
				</ul>

				<p class="plan-price">$4,800 - $10,000 monthly</p>
			</label>
		</div>
	</div>
	<div class="flex flex-col md:flex-row gap-16">
		<div class="flex-1 flex flex-col gap-16">
			<Field.Input
				name="name"
				label="Name"
				placeholder="Jane Smith"
				required
			/>
			<Field.Input
				name="email"
				label="Email"
				placeholder="jane.smith@acme.com"
				required
				type="email"
			/>
			<Field.Input
				name="company"
				label="Company"
				placeholder="Acme Corp"
			/>
		</div>
		<div class="flex-1 flex flex-col justify-end gap-16">
			<div class="flex flex-col gap-16 callout p-8 rounded">
				<p>
					After submitting,
					I will review your request and
					get back to you within 3 business days.
				</p>
				<p class="text-small text-grey-600
					dark:text-yellow-100 text-balance">
					I respect your privacy.
					Your information will not be shared with third parties.
				</p>
			</div>
			<div class="place-self-end flex gap-16">
				<button>Cancel</button>
				<button type="submit">Submit</button>
			</div>
		</div>
	</div>
</form>
