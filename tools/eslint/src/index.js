import js from '@eslint/js';
import { monorepo } from '@vadirn/monorepo';
import prettier from 'eslint-config-prettier';
import pluginImportX from 'eslint-plugin-import-x';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

const project = [
	monorepo.resolve('tsconfig.json'),
	monorepo.apps('*', 'tsconfig.json'),
	monorepo.core('*', 'tsconfig.json'),
	monorepo.tools('*', 'tsconfig.json'),
	monorepo.libs('*', 'tsconfig.json'),
	monorepo.ui('*', 'tsconfig.json'),
];

/** @type {import('eslint').Linter.FlatConfig[]} */
export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				project,
				tsconfigRootDir: monorepo.root,
				sourceType: 'module',
				ecmaVersion: 2020,
				extraFileExtensions: ['.svelte'],
			},
		},
		settings: {
			'import-x/parsers': {
				'svelte-eslint-parser': ['.svelte'],
				'@typescript-eslint/parser': ['.ts'],
				espree: ['.js'],
			},
			'import-x/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project,
				},
			},
		},
		plugins: {
			'import-x': pluginImportX,
		},
		rules: {
			...pluginImportX.configs.recommended.rules,
			// 'import/no-unresolved': 'error',
			// 'import/no-unused-modules': 'warn',
		},
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
		rules: {
			'svelte/sort-attributes': [
				'warn',
				{
					order: [
						// `slot` attribute.
						'slot',
						// `this` property.
						'this',
						// `bind:this` directive.
						'bind:this',
						// `id` attribute.
						'id',
						// `name` attribute.
						'name',
						// `--style-props` (Alphabetical order within the same group.)
						{ match: '/^--/u', sort: 'alphabetical' },
						// `style` attribute, and `style:` directives.
						['style', '/^style:/u'],
						// `class` attribute.
						'class',
						// `class:` directives. (Alphabetical order within the same group.)
						{ match: '/^class:/u', sort: 'alphabetical' },
						// class attribute for components
						{ match: '/^className/u', sort: 'alphabetical' },
						// other attributes. (Alphabetical order within the same group.)
						{
							match: ['!/:/u', '!/^(?:this|id|name|style|class)$/u', '!/^--/u'],
							sort: 'alphabetical',
						},
						// `bind:` directives (other then `bind:this`), and `on:` directives.
						['/^bind:/u', '!bind:this', '/^on:/u'],
						// `use:` directives. (Alphabetical order within the same group.)
						{ match: '/^use:/u', sort: 'alphabetical' },
						// `transition:` directive.
						{ match: '/^transition:/u', sort: 'alphabetical' },
						// `in:` directive.
						{ match: '/^in:/u', sort: 'alphabetical' },
						// `out:` directive.
						{ match: '/^out:/u', sort: 'alphabetical' },
						// `animate:` directive.
						{ match: '/^animate:/u', sort: 'alphabetical' },
						// `let:` directives. (Alphabetical order within the same group.)
						{ match: '/^let:/u', sort: 'alphabetical' },
					],
				},
			],
		},
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/'],
	}
);
