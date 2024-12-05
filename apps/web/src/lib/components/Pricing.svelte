<script lang="ts">
	import { Field } from '@ui/components/field';
	const { labelledby }: { labelledby: string } = $props();
</script>

<style lang="postcss">
	.modal {
		@apply bg-background p-16 rounded;

		width: 100%;
	}

	.pricing {
		@apply flex flex-col gap-16 md:flex-row mb-16;

		div {
			@apply flex items-stretch relative;

			min-width: 200px;
		}
	}

	.plan-radio {
		@apply opacity-0 absolute;
	}

	.plan-label {
		@apply flex flex-1 flex-col bg-gray-200 text-gray-900
			p-16 pt-8 rounded transition-all;
	}

	.plan-label:hover {
		@apply bg-gray-300;
	}

	.plan-radio:checked + .plan-label {
		@apply bg-accent text-gray-100;
	}

	.plan-title {
		@apply flex items-center font-bold text-balance mb-20 gap-8;

		min-height: 40px;
	}

	.plan-features {
		@apply flex-auto text-caption mb-20;
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
		@apply ring-2 ring-offset-2 ring-blue ring-offset-neutral-100;
	}
</style>

<form class="modal">
	<h2 id={labelledby} class="sr-only">Pricing plans</h2>
	<div class="pricing">
		<div>
			<input
				id="plan-basic"
				name="plan"
				class="plan-radio"
				type="radio"
				value="basic"
			/>
			<label class="plan-label" for="plan-basic">
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
			<label class="plan-label" for="plan-comprehensive">
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
			<label class="plan-label" for="plan-ongoing">
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
	<div class="flex gap-16">
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
				placeholder="Email address"
				required
				type="email"
			/>
			<Field.Input
				name="company"
				label="Company"
				placeholder="Company name"
			/>
		</div>
		<div class="flex-1 flex flex-col justify-end items-end gap-16">
			<button type="submit">Submit</button>
		</div>
	</div>
</form>
