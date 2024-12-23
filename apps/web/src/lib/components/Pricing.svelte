<script lang="ts">
	import { preventDefault } from '@libs/standard/dom';
	import { noop, type Fn } from '@libs/standard/function';
	import { Field } from '@ui/components/field';
	import { PersistedState } from '@libs/runes/persisted-state';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	type Props = {
		labelledby: string;
		setVisibility?: Fn<void, [Event, boolean]>;
	};

	const { labelledby, setVisibility = noop }: Props = $props();

	const closeModal = (event: Event) => setVisibility(event, false);

	const FormStates = {
		Idle: 'idle',
		Submitting: 'submitting',
		Success: 'success',
		Error: 'error',
	} as const;
	type FormState = typeof FormStates[keyof typeof FormStates];
	let formState: FormState = $state('idle');
	const planField = new PersistedState('contact-form-plan');
	const nameField = new PersistedState('contact-form-name');
	const emailField = new PersistedState('contact-form-email');
	const companyField = new PersistedState('contact-form-company');
	const messageField = new PersistedState('contact-form-message');

	const submitFunction: SubmitFunction = ({ cancel, formElement }) => {
		const isFormValid = formElement.checkValidity();

		console.log(isFormValid);

		if (formState === FormStates.Submitting || !isFormValid) {
			return cancel();
		}

		formState = FormStates.Submitting;

		return async ({ result }) => {
			formState = FormStates.Success;
			console.log(result);
		};
	};
</script>

<style lang="postcss">
	.modal {
		@apply p-16 pb-24 bg-background rounded-8 shadow-modal;
	}

	.pricing {
		@apply flex flex-col gap-16 mb-24;

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
		@apply flex flex-auto flex-col p-16 pt-8 rounded-4 selectable;

		&.has-error {
			@apply bg-red-50 hover:bg-red-100
				dark:bg-red-800 dark:hover:bg-red-900 focus-visible:ring-red-400;
		}
	}

	.plan-radio:checked + .plan-label {
		@apply selected;
	}

	.plan-title {
		@apply flex gap-8 items-center min-h-40 mb-20 font-bold;

		white-space: balance;
	}

	.plan-features {
		@apply flex-auto mb-20 text-small;
	}

	.icon-select {
		@apply relative block w-16 h-16 border-1
			border-solid border-current rounded-full;
	}

	.plan-radio:checked + .plan-label .icon-select {
		&::before {
			@apply block absolute inset-[3px] bg-current rounded-full;

			content: '';
		}
	}

	.plan-radio:focus-visible + .plan-label {
		@apply ring-2 ring-offset-2 ring-blue-400 ring-offset-background;
	}

	.fields {
		@apply flex flex-col gap-24;

		/* max-width: 480px; */
		margin-inline-start: auto;
	}
</style>

<form class="modal" method="POST" use:enhance={submitFunction}>
	<h2 id={labelledby} class="mb-16">Get a Quote</h2>
	<Field.Custom
		name="plan-basic"
		label="Choose a tier that best suits your needs"
		required={true}
		validationMessage={{
			valueMissing: 'Please select a tier',
		}}
	>
		{#snippet input({ error, onInput, onInvalid })}
			<div class="pricing">
				<div>
					<input
						id="plan-basic"
						name="plan"
						class="plan-radio"
						required
						type="radio"
						value="basic"
						bind:group={planField.value}
						oninput={onInput}
						oninvalid={onInvalid}
					/>
					<label class="plan-label" class:has-error={error} for="plan-basic">
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
						id="plan-advanced"
						name="plan"
						class="plan-radio"
						required
						type="radio"
						value="advanced"
						bind:group={planField.value}
						oninput={onInput}
						oninvalid={preventDefault}
					/>
					<label class="plan-label" class:has-error={error} for="plan-advanced">
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
						id="plan-monthly"
						name="plan"
						class="plan-radio"
						required
						type="radio"
						value="monthly"
						bind:group={planField.value}
						oninput={onInput}
						oninvalid={preventDefault}
					/>
					<label class="plan-label" class:has-error={error} for="plan-monthly">
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
		{/snippet}
	</Field.Custom>
	<div class="fields">
		<Field.Input
			name="name"
			label="Name"
			placeholder="Jane Smith"
			required
			validationMessage={{
				valueMissing: 'Please enter your name',
			}}
			bind:value={nameField.value}
		/>
		<Field.Input
			name="email"
			label="Email"
			placeholder="jane.smith@acme.com"
			required
			type="email"
			validationMessage={{
				valueMissing: 'Please enter your email',
				typeMismatch: 'Please enter a valid email',
			}}
			bind:value={emailField.value}
		/>
		<Field.Input
			name="company"
			label="Company"
			placeholder="Acme Corp"
			bind:value={companyField.value}
		/>
		<Field.Textarea
			name="message"
			label="Describe your project"
			placeholder="Tech stack, project goals, etc."
			bind:value={messageField.value}
		/>
		<div class="flex flex-col gap-8">
			<p>
				After submitting,
				I will review your request and
				get back to you within 3 business days.
			</p>
			<p class="text-small text-yellow-400
				dark:text-yellow-100 text-balance">
				I respect your privacy.
				Your information will not be shared with third parties.
			</p>
		</div>
		<div class="flex flex-row-reverse gap-16">
			<button
				disabled={formState === FormStates.Submitting}
				tabindex="0"
				type="submit"
			>
				{#if formState === FormStates.Submitting}
					Loading...
				{:else}
					Submit
				{/if}
			</button>
			<button
				tabindex="0"
				type="button"
				onclick={closeModal}
			>
				Cancel
			</button>
			<div class="flex-auto"></div>
			<button
				tabindex="0"
				type="reset"
			>
				Start over
			</button>
		</div>
	</div>
</form>
