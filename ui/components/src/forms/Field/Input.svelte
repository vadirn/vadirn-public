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

	input {
		@apply w-full rounded border-neutral-500
			border px-[15px] py-8 bg-background;

		&:focus-visible {
			@apply outline-none ring-2 ring-offset-2
				ring-blue ring-offset-neutral-100;
		}
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
