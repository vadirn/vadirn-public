<script lang="ts" >
	import { isNonEmptyString } from '@libs/standard/string';
	import CustomField from './Custom.svelte';
	import type { FieldProps } from './types';

	type Props = FieldProps & {
		value?: string;
		placeholder?: string;
		autocomplete?: AutoFill;
		rows?: number;
	};

	let {
		className,
		name,
		label,
		value = $bindable(''),
		placeholder = '',
		required = false,
		disabled = false,
		autocomplete = 'off',
		rows = 2,
		validationMessage,
	}: Props = $props();
</script>

<style lang="postcss">
	textarea.variant-error {
		background-color: var(--color-red-50);

		:global(.dark) & {
			background-color: var(--color-red-800);
		}

		&:focus-visible {
			outline-color: var(--color-red-400);
		}
	}
</style>

<CustomField
	{name}
	{className}
	{label}
	{required}
	{validationMessage}>
	{#snippet input({ id, describedBy, error, onInput, onInvalid })}
		<textarea
			{id}
			{name}
			class:variant-error={isNonEmptyString(error)}
			aria-describedby={describedBy}
			{autocomplete}
			{disabled}
			{placeholder}
			{required}
			{rows}
			bind:value
			oninput={onInput}
			oninvalid={onInvalid}
		></textarea>
	{/snippet}
</CustomField>
