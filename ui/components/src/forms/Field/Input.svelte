<script lang="ts" >
	type InputProps = {
		name: string;
		label: string;
		type?: string;
		placeholder?: string;
		required?: boolean;
	};
	const {
		name,
		label, type = 'text',
		placeholder = '',
		required = false,
	}: InputProps = $props();
</script>

<style lang="postcss">
	label {
		@apply block mb-8;
	}
</style>

<div>
	<label for="input-{name}">{label}</label>
	<input
		id="input-{name}"
		{name}
		{placeholder}
		{required}
		{type}
	/>
</div>
