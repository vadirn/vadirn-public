import type { Snippet } from 'svelte';

export type InputProps = {
	id: string;
	describedBy?: string;
	error?: string;
	onInput?: (event: Event) => void;
	onInvalid?: (event: Event) => void;
};

export type FieldProps = {
	className?: string;
	name: string;
	label: string;
	required?: boolean;
	disabled?: boolean;
	validationMessage?: Partial<{
		valueMissing: string;
		typeMismatch: string;
		patternMismatch: string;
		tooShort: string;
		tooLong: string;
		rangeUnderflow: string;
		rangeOverflow: string;
		stepMismatch: string;
		badInput: string;
	}>;
	input?: Snippet<[InputProps]>;
};
