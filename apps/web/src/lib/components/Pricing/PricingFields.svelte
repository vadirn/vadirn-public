<script lang="ts">
	import { Button } from '@ui/components/button';
	import { Field } from '@ui/components/field';
	import {
		FormStates,
		type FormControllerInstance,
	} from './form-controller.svelte';

	type Props = {
		formController: FormControllerInstance;
		disabled: boolean;
		closeModal: () => void;
	};

	const { formController, disabled, closeModal }: Props = $props();

	const submitLabel = $derived({
		[FormStates.Idle]: 'Submit',
		[FormStates.Submitting]: 'Loading...',
		[FormStates.Success]: 'Done',
		[FormStates.Error]: 'Try again',
	}[formController.state]);
</script>

<style lang="postcss">
	.fields {
		display: flex;
		flex-direction: column;
		gap: var(--size-24);
		margin-inline-start: auto;
	}

	.form-message {
		width: fit-content;
		margin-inline-start: auto;
		font-size: var(--font-size-small);
		line-height: var(--line-height-small);
	}
</style>

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
		<p class="text-small color-yellow-400
			dark:color-yellow-100 wrap-balance">
			I respect your privacy.
			Your information will not be shared with third parties.
		</p>
	</div>
	{#if formController.message}
		<p
			class="form-message"
			class:color-green-400={formController.state === FormStates.Success}
			class:color-red-400={formController.state === FormStates.Error}
		>
			{formController.message}
		</p>
	{/if}
	<div class="flex flex-row-reverse gap-16">
		<Button
			type="submit"
			onclick={event => formController.submit(event, closeModal)}
		>
			{submitLabel}
		</Button>
		{#if formController.state !== FormStates.Success}
			<Button
				type="button"
				onclick={closeModal}
			>
				Cancel
			</Button>
		{/if}
		<div class="flex-auto"></div>
		<Button
			type="reset"
			onclick={formController.reset}
		>
			Start over
		</Button>
	</div>
</div>
