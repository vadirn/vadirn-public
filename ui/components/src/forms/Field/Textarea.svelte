<script lang="ts" >
	type TextareaProps = {
		className?: string;
		name: string;
		label: string;
		error?: string;
		placeholder?: string;
		required?: boolean;
		autocomplete?: AutoFill;
		rows?: number;
	};
	const {
		className,
		name,
		label,
		error,
		placeholder = '',
		required = false,
		autocomplete = 'off',
		rows = 2,
	}: TextareaProps = $props();
</script>

<style lang="postcss">
	label {
		@apply block mb-8 flex-auto;
	}

	.required::after {
		@apply text-red-400;

		content: ' * ';
	}

	.error {
		@apply text-red-400 text-small mb-8;
	}

	.has-error {
		@apply border-red-400 focus-visible:ring-red-400;
	}
</style>

<div class={className}>
	<div class="flex items-end gap-8">
		<label class:required for="input-{name}">{label}</label>
		<span id="input-{name}-error" class="error" aria-live="polite">
			{error}
		</span>
	</div>

	<textarea
		id="input-{name}"
		{name}
		class:has-error="{error}"
		aria-describedby="input-{name}-error"
		{autocomplete}
		{placeholder}
		{required}
		{rows}
	></textarea>
</div>
