<script lang="ts" >
	import CustomField from './Custom.svelte';
	import type { FieldProps } from './types';

	type Props = FieldProps & {
		type?: string;
		placeholder?: string;
		autocomplete?: AutoFill;
	};

	const {
		className,
		name,
		label,
		type = 'text',
		placeholder = '',
		required = false,
		autocomplete = 'off',
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
		<input
			{id}
			{name}
			class:has-error={error}
			aria-describedby={describedBy}
			{autocomplete}
			{placeholder}
			{required}
			{type}
			oninput={onInput}
			oninvalid={onInvalid}
		/>
	{/snippet}
</CustomField>
