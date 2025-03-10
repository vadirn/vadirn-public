<script lang="ts">
	import { preventDefault } from '@libs/standard/dom';
	import { noop, type Fn } from '@libs/standard/function';
	import { isNonEmptyString } from '@libs/standard/string';
	import { Field } from '@ui/components/field';
	import { FormController, FormStates } from './form-controller.svelte';
	import PricingFields from './PricingFields.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	type Props = {
		labelledby: string;
		setModalVisibility?: Fn<void, [boolean]>;
		setModalScroll?: Fn<void, [number]>;
	};

	const {
		labelledby,
		setModalVisibility = noop,
		setModalScroll = noop,
	}: Props = $props();

	const closeModal = () => setModalVisibility(false);

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

	const disabled = $derived(formController.state === FormStates.Success);
</script>

<style lang="postcss">
	.modal {
		padding: var(--size-16) var(--size-16) var(--size-24);
	}

	.pricing {
		display: flex;
		flex-direction: column;
		gap: var(--size-16);
		margin-bottom: var(--size-24);

		@media (--gt-tablet) {
			flex-direction: row;
		}

		div {
			position: relative;
			display: flex;
			align-items: stretch;
			min-width: 200px;
		}
	}

	h2 {
		font-size: var(--font-size-heading);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-heading);
		text-wrap: balance;
	}

	input[type='radio'] {
		position: absolute;
		opacity: 0;
	}

	.selectable {
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;
		padding: var(--size-8) var(--size-16) var(--size-16);
		border-radius: var(--radius-4);
	}

	.plan-title {
		display: flex;
		gap: var(--size-8);
		align-items: center;
		min-height: var(--size-40);
		margin-bottom: var(--size-20);
		font-weight: var(--font-weight-bold);
		text-wrap: balance;
	}

	.plan-features {
		flex: 1 1 auto;
		margin-bottom: var(--size-20);
		font-size: var(--font-size-small);
		line-height: var(--line-height-small);
	}

	.icon-select {
		position: relative;
		display: block;
		width: var(--size-16);
		height: var(--size-16);
		border: var(--line-width-1) solid currentcolor;
		border-radius: var(--radius-full);
	}

	.selectable:has(:checked) .icon-select {
		&::before {
			position: absolute;
			inset: 3px;
			display: block;
			content: '';
			background-color: currentcolor;
			border-radius: var(--radius-full);
		}
	}
</style>

<form
	class="modal"
	method="POST"
	onreset={() => formController.handleReset(setModalScroll)}
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
				<div
					class="selectable focusable"
					class:variant-error={isNonEmptyString(error)}
				>
					<input
						id="plan-basic"
						name="plan"
						{disabled}
						required
						type="radio"
						value="basic"
						bind:group={formController.fields.plan.value}
						oninput={onInput}
						oninvalid={onInvalid}
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
				<div
					class="selectable focusable"
					class:variant-error={isNonEmptyString(error)}
				>
					<input
						id="plan-advanced"
						name="plan"
						{disabled}
						required
						type="radio"
						value="advanced"
						bind:group={formController.fields.plan.value}
						oninput={onInput}
						oninvalid={preventDefault}
					/>
					<label class="plan-label" for="plan-advanced">
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
				<div
					class="selectable focusable"
					class:variant-error={isNonEmptyString(error)}
				>
					<input
						id="plan-monthly"
						name="plan"
						{disabled}
						required
						type="radio"
						value="monthly"
						bind:group={formController.fields.plan.value}
						oninput={onInput}
						oninvalid={preventDefault}
					/>
					<label class="plan-label" for="plan-monthly">
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

	<PricingFields
		{closeModal}
		{disabled}
		{formController}
	/>
</form>
