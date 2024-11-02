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
	},
]);
