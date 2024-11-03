import StylisticEslintPlugin from '@stylistic/eslint-plugin';
import { setDefaultFiles } from './utils.js';

const configs = StylisticEslintPlugin.configs;

export const style = () => ([
	...setDefaultFiles(
		configs['disable-legacy'],
		configs.customize({
			indent: 'tab',
			quotes: 'single',
			semi: true,
			jsx: false,
		}),
		{
			rules: {
				'@stylistic/array-bracket-newline': ['error', 'consistent'],
				'@stylistic/array-element-newline': [
					'error',
					{
						multiline: true,
						consistent: true,
						minItems: null,
					},
				],
				'@stylistic/function-call-spacing': ['error', 'never'],
				'@stylistic/function-paren-newline': ['error', 'multiline'],
				'@stylistic/generator-star-spacing': [
					'error',
					{ before: true, after: true },
				],
				'@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
				'@stylistic/max-len': [
					'error',
					{
						code: 80,
						tabWidth: 4,
						ignoreComments: true,
						ignoreUrls: true,
					},
				],
				'@stylistic/multiline-comment-style': [
					'error',
					'separate-lines',
				],
				'@stylistic/no-extra-semi': 'error',
				'@stylistic/nonblock-statement-body-position': [
					'error',
					'beside',
				],
				'@stylistic/object-curly-newline': [
					'error',
					{ consistent: true },
				],
				'@stylistic/object-property-newline': [
					'error',
					{ allowAllPropertiesOnSameLine: true },
				],
				'@stylistic/operator-linebreak': ['error', 'before'],
				'@stylistic/padding-line-between-statements': [
					'error',
					{ blankLine: 'always', prev: 'import', next: '*' },
					{ blankLine: 'never', prev: 'import', next: 'import' },
					{ blankLine: 'always', prev: '*', next: 'return' },
					{
						blankLine: 'always',
						prev: ['const', 'let', 'var'],
						next: '*',
					},
					{
						blankLine: 'any',
						prev: ['const', 'let', 'var'],
						next: ['const', 'let', 'var'],
					},
					{
						blankLine: 'always',
						prev: ['case', 'default'],
						next: '*',
					},
					{ blankLine: 'always', prev: 'directive', next: '*' },
					{ blankLine: 'always', prev: 'function', next: 'function' },
				],
			},
		},
	),
	{
		files: ['**/*.svelte'],
		rules: {
			'svelte/indent': ['error', { indent: 'tab' }],
			'svelte/sort-attributes': [
				'warn',
				{
					order: [
						'slot',
						'this',
						'bind:this',
						'id',
						'name',
						// `--style-props` (Alphabetical order within the same group.)
						{ match: '/^--/u', sort: 'alphabetical' },
						// `style` attribute, and `style:` directives.
						['style', '/^style:/u'],
						'class',
						// `class:` directives. (Alphabetical order within the same group.)
						{ match: '/^class:/u', sort: 'alphabetical' },
						// class attribute for components
						{ match: '/^className/u', sort: 'alphabetical' },
						// other attributes. (Alphabetical order within the same group.)
						{
							match: [
								'!/:/u',
								'!/^(?:this|id|name|style|class)$/u',
								'!/^--/u',
							],
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
]);
