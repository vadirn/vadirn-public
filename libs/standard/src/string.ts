import { isNil } from './common';

/**
 * Checks if a value is a string.
 */
export function isString(value: unknown): value is string {
	return typeof value === 'string' || value instanceof String;
}

/** Checks if given value is a string of length > 0 */
export function isNonEmptyString(value: unknown): value is string {
	return (
		(typeof value === 'string' || value instanceof String)
		&& value.length > 0
	);
}

function isUpperCase(char: string) {
	if (isNonEmptyString(char) && char.length === 1) {
		return char === char.toUpperCase() && char !== char.toLowerCase();
	}

	return false;
}

const defaultDelimiterSymbols = new Set([' ', '-', '+', '_']);

function splitIntoWords(
	text: string,
	delimiterSymbols: Set<string> = defaultDelimiterSymbols,
) {
	const words: string[] = [];
	let currentWord = '';

	for (const char of text) {
		const charIsUpperCase = isUpperCase(char);
		const charIsDelimiter = delimiterSymbols.has(char);
		const isUpperCaseOrDelimiter = charIsDelimiter || charIsUpperCase;

		if (isUpperCaseOrDelimiter && currentWord.length > 0) {
			words.push(currentWord);
		}
		currentWord = nextWord(
			currentWord,
			char,
			charIsUpperCase,
			charIsDelimiter,
		);
	}
	// check if there is a word left
	if (currentWord.length > 0) {
		words.push(currentWord);
	}

	return words;
}

function nextWord(
	currentWord: string,
	char: string,
	isUpperCase: boolean,
	isDelimiter: boolean,
) {
	if (isUpperCase) return char;
	if (isDelimiter) return '';

	return currentWord + char;
}

/** Make the first letter uppercase, and the rest lowercase */
export function capitalize(text: string) {
	const [char, ...rest] = text;

	if (isNil(char)) return text;

	return char.toUpperCase() + rest.join('').toLowerCase();
}

/** Convert to snake_case */
export function toSnakeCase(text: string, delimiterSymbols?: Set<string>) {
	return splitIntoWords(text, delimiterSymbols)
		.map(word => word.toLowerCase())
		.join('_');
}

/** Convert to kebab-case */
export function toKebabCase(text: string, delimiterSymbols?: Set<string>) {
	return splitIntoWords(text, delimiterSymbols)
		.map(word => word.toLowerCase())
		.join('-');
}

/** Convert to camelCase */
export function toCamelCase(text: string, delimiterSymbols?: Set<string>) {
	return splitIntoWords(text, delimiterSymbols)
		.map((word, i) => (i === 0 ? word.toLowerCase() : capitalize(word)))
		.join('');
}

/**
 * Converts the given string to Title Case
 */
export function toTitleCase(text: string, delimiterSymbols?: Set<string>) {
	return splitIntoWords(text, delimiterSymbols)
		.map(word => capitalize(word))
		.join(' ');
}
