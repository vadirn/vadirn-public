<script lang="ts">
	import { PersistedState } from '@libs/runes/persisted-state';
	import { preventDefault } from '@libs/standard/dom';
	import { noop, type Fn } from '@libs/standard/function';
	import { Field } from '@ui/components/field';
	import { attachMethods } from '@libs/state-controller';
	import { tick } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ContactFormData } from '@domain/all/contact-form';
	import { enhance } from '$app/forms';

	type Props = {
		labelledby: string;
		setModalVisibility?: Fn<void, [Event, boolean]>;
		setModalScroll?: Fn<void, [number]>;
	};

	const {
		labelledby,
		setModalVisibility = noop,
		setModalScroll = noop,
	}: Props = $props();

	const closeModal = (event: Event) => setModalVisibility(event, false);

	const FormStates = {
		Idle: 'idle',
		Submitting: 'submitting',
		Success: 'success',
		Error: 'error',
	} as const;
	type FormState = typeof FormStates[keyof typeof FormStates];
	class FormController {
		state: FormState = $state(FormStates.Idle);
		message = $state('');
		fields = {
			plan: new PersistedState('contact-form-plan'),
			name: new PersistedState('contact-form-name'),
			email: new PersistedState('contact-form-email'),
			company: new PersistedState('contact-form-company'),
			message: new PersistedState('contact-form-message'),
		} satisfies Record<keyof ContactFormData, PersistedState>;

		protected constructor() {}

		resetFields = () => {
			for (const field of Object.values(this.fields)) {
				field.value = '';
			}
		};

		resetMessage = () => {
			this.message = '';
		};

		static create() {
			const instance = new this();

			return attachMethods(instance, {
				[FormStates.Idle]: {
					startSubmitting: () => {
						instance.state = FormStates.Submitting;
						instance.resetMessage();
					},
					handleReset: async () => {
						setModalScroll(0);
						instance.resetMessage();
						// some browsers (Safari) change focus on reset
						// ensure disabled elements are released first
						await tick();
						(document.activeElement as HTMLElement)?.blur();
					},
					submit: (event: Event) => {
						const formElement = (event.target as HTMLElement).closest('form');

						if (!formElement.checkValidity()) {
							formController.message = 'Please fix the errors above';
							instance.state = FormStates.Error;
						}
					},
				},
				[FormStates.Submitting]: {
					success: () => {
						instance.state = FormStates.Success;
					},
					error: () => {
						instance.state = FormStates.Error;
					},
					// prevent click on reset button instead of trying to preventDefault the form
					reset: preventDefault,
					submit: preventDefault,
				},
				get [FormStates.Success]() {
					return {
						startSubmitting: this[FormStates.Idle].startSubmitting,
						reset: async (event: Event) => {
							event.preventDefault();
							instance.state = FormStates.Idle;
							instance.resetMessage();
							(event.target as HTMLElement).closest('form')?.reset();
						},
						submit: (event: Event) => {
							event.preventDefault();
							// clean up fields when done
							instance.resetFields();
							instance.resetMessage();
							closeModal(event);
						},
					};
				},
				get [FormStates.Error]() {
					return {
						startSubmitting: this[FormStates.Idle].startSubmitting,
						reset: this[FormStates.Success].reset,
					};
				},
			});
		}
	}

	const formController = FormController.create();

	const submitFunction: SubmitFunction = () => {
		formController.startSubmitting();

		return async ({ result }) => {
			if (result.type === 'success') {
				formController.success();

				return;
			}

			if (result.type === 'error') {
				formController.message = result.error.message;
			}

			if (result.type === 'failure') {
				formController.message = result.data.message;
			}

			formController.error();
		};
	};

	const submitLabel = $derived({
		[FormStates.Idle]: 'Submit',
		[FormStates.Submitting]: 'Loading...',
		[FormStates.Success]: 'Done',
		[FormStates.Error]: 'Try again',
	}[formController.state]);
	const disabled = $derived(formController.state === FormStates.Success);
</script>

<style lang="postcss">
	.modal {
		@apply p-16 pb-24 bg-background rounded-8 shadow-modal;
	}

	.pricing {
		@apply flex flex-col gap-16 mb-24;

		@media (--gt-tablet) {
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

	.plan-radio:focus-visible + .plan-label,
	:global(.focus-visible) .plan-radio:focus + .plan-label {
		@apply ring-2 ring-offset-2 ring-blue-400 ring-offset-background;
	}

	.fields {
		@apply flex flex-col gap-24;

		/* max-width: 480px; */
		margin-inline-start: auto;
	}

	.form-message {
		@apply text-small w-fit;

		margin-inline-start: auto;
	}
</style>

<form
	class="modal"
	method="POST"
	onreset={formController.handleReset}
	use:enhance={submitFunction}
>
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
						{disabled}
						required
						type="radio"
						value="basic"
						bind:group={formController.fields.plan.value}
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
						{disabled}
						required
						type="radio"
						value="advanced"
						bind:group={formController.fields.plan.value}
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
						{disabled}
						required
						type="radio"
						value="monthly"
						bind:group={formController.fields.plan.value}
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
			{disabled}
			label="Name"
			placeholder="Jane Smith"
			required
			validationMessage={{
				valueMissing: 'Please enter your name',
			}}
			bind:value={formController.fields.name.value}
		/>
		<Field.Input
			name="email"
			{disabled}
			label="Email"
			placeholder="jane.smith@acme.com"
			required
			type="email"
			validationMessage={{
				valueMissing: 'Please enter your email',
				typeMismatch: 'Please enter a valid email',
			}}
			bind:value={formController.fields.email.value}
		/>
		<Field.Input
			name="company"
			{disabled}
			label="Company"
			placeholder="Acme Corp"
			bind:value={formController.fields.company.value}
		/>
		<Field.Textarea
			name="message"
			{disabled}
			label="Describe your project"
			placeholder="Tech stack, project goals, etc."
			bind:value={formController.fields.message.value}
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
		{#if formController.message}
			<p
				class="form-message"
				class:text-green-400={formController.state === FormStates.Success}
				class:text-red-400={formController.state === FormStates.Error}
			>
				{formController.message}
			</p>
		{/if}
		<div class="flex flex-row-reverse gap-16">
			<button
				type="submit"
				onclick={formController.submit}
			>
				{submitLabel}
			</button>
			{#if formController.state !== FormStates.Success}
				<button
					type="button"
					onclick={closeModal}
				>
					Cancel
				</button>
			{/if}
			<div class="flex-auto"></div>
			<button
				type="reset"
				onclick={formController.reset}
			>
				Start over
			</button>
		</div>
	</div>
</form>
