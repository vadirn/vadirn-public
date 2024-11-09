import SvelteEslintPlugin from 'eslint-plugin-svelte';
import SvelteEslintParser from 'svelte-eslint-parser';
import { parser } from 'typescript-eslint';

export const svelte = () => ([
	...SvelteEslintPlugin.configs['flat/recommended'],
	{
		files: [
			'**/*.svelte',
			'**/*.svelte.ts',
			'**/*.svelte.js',
		],
		languageOptions: {
			parser: SvelteEslintParser,
			parserOptions: {
				parser,
			},
		},
		rules: {
			'svelte/prefer-class-directive': ['error', { prefer: 'always' }],
			'svelte/prefer-style-directive': 'error',
			'svelte/shorthand-attribute': ['error', { prefer: 'always' }],
			'svelte/shorthand-directive': ['error', { prefer: 'always' }],
		},
	},
]);
