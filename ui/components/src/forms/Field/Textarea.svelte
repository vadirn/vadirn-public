<script lang="ts" >
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
	.has-error {
		@apply bg-red-50 dark:bg-red-800 focus-visible:ring-red-400;
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
			class:has-error={error}
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
