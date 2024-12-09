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
		@apply w-full rounded border-grey-500
			border px-[15px] py-8 bg-white
			bg-background;
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
