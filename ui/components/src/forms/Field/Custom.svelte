<script lang="ts" >
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import type { FieldProps } from './types';

	const {
		className,
		name,
		label,
		required = false,
		validationMessage,
		input,
	}: FieldProps = $props();

	const validityKeys = [
		'valueMissing',
		'typeMismatch',
		'patternMismatch',
		'tooShort',
		'tooLong',
		'rangeUnderflow',
		'rangeOverflow',
		'stepMismatch',
		'badInput',
	] as const;

	let element: HTMLElement;
	let error: string | undefined = $state();

	const onInvalid = (event: Event) => {
		event.preventDefault();
		const target = event.target as HTMLInputElement;

		for (const key of validityKeys) {
			if (target.validity[key] && validationMessage?.[key]) {
				error = validationMessage?.[key];

				return;
			}
		}

		error = target.validationMessage;
	};

	const onInput = () => {
		if (error) {
			error = undefined;
		}
	};

	onMount(() => {
		// find parent form element
		const form = element.closest('form');

		if (!form) return;

		// cleanup errors on reset
		const off = on(form, 'reset', () => {
			error = undefined;
		});

		return off;
	});
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
</style>

<div bind:this={element} class={className}>
	<div class="flex items-end gap-8">
		<label class:required for="input-{name}">{label}</label>
		<span id="input-{name}-error" class="error" aria-live="polite">
			{error}
		</span>
	</div>

	{@render input?.({
		id: `input-${name}`,
		describedBy: `input-${name}-error`,
		error,
		onInput,
		onInvalid,
	})}
</div>
