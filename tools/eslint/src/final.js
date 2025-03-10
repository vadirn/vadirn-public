import { setDefaultFiles } from './utils.js';

const finalRules = {
	rules: {
		'no-restricted-syntax': [
			'error',
			{
				// eslint-disable-next-line @stylistic/max-len
				selector: 'CallExpression[callee.object.name="console"][callee.property.name="log"]',
				// eslint-disable-next-line @stylistic/max-len
				message: 'Use console.info() instead of console.log() for production code.',
			},
			{
				selector: 'CallExpression[callee.name="logAndReturn"]',
				message: 'Not allowed in production code.',
			},
			{
				selector: 'CallExpression[callee.property.name="forEach"]',
				// eslint-disable-next-line @stylistic/max-len
				message: 'Use for-of loops instead of forEach for better readability and performance',
			},
			{
				selector: 'TSEnumDeclaration',
				message: 'Use "as const" instead of enums',
			},
		],
		'@typescript-eslint/no-empty-object-type': [
			'error',
			{
				allowInterfaces: 'never', allowObjectTypes: 'always',
			},
		],
		'prefer-const': ['error', { destructuring: 'all' }],
		'array-callback-return': ['error', { allowImplicit: true }],
		'complexity': ['error', { max: 10 }],
		'max-depth': ['error', { max: 3 }],
		'max-nested-callbacks': ['error', { max: 3 }],
		'max-params': ['error', { max: 4 }],
		'no-magic-numbers': ['error', { ignore: [0, 1, -1] }],
		'@typescript-eslint/naming-convention': [
			'error',
			// Default - require strictCamelCase
			{
				selector: 'default',
				format: ['strictCamelCase'],
				leadingUnderscore: 'allowSingleOrDouble',
			},

			// Variables and parameters
			{
				selector: 'variable',
				format: ['strictCamelCase', 'UPPER_CASE'],
				leadingUnderscore: 'allowSingleOrDouble',
			},

			// Constants should be UPPER_CASE or strictCamelCase
			{
				selector: 'variable',
				modifiers: ['const'],
				format: ['strictCamelCase', 'UPPER_CASE', 'PascalCase'],
				leadingUnderscore: 'allowSingleOrDouble',
			},

			// Boolean variables should use is/has/should prefix
			{
				selector: 'variable',
				types: ['boolean'],
				format: ['camelCase'],
				prefix: ['is', 'has', 'should', 'can', 'did', 'will'],
				leadingUnderscore: 'allowSingleOrDouble',
				filter: {
					regex: '^(required|disabled)?',
					match: false,
				},
			},

			// Array types should use plural names
			{
				selector: 'variable',
				types: ['array'],
				format: ['camelCase'],
				suffix: ['s', 'List', 'Array', 'Collection'],
				leadingUnderscore: 'allowSingleOrDouble',
			},

			// Classes and type aliases
			{
				selector: 'typeLike',
				format: ['PascalCase'],
			},

			// Interface names must be prefixed with 'I'
			{
				selector: 'interface',
				format: ['PascalCase'],
				prefix: ['I'],
				filter: {
					regex: '^(Window)$',
					match: false,
				},
			},

			// Type parameters should use T prefix
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
				prefix: ['T'],
			},

			{
				selector: 'import',
				format: ['strictCamelCase', 'PascalCase'],
			},

			// Object properties can be strictCamelCase or snake_case (for API responses)
			{
				selector: 'property',
				format: ['strictCamelCase', 'snake_case'],
				leadingUnderscore: 'allowSingleOrDouble',
			},

			// Readonly properties can be PascalCase, strictCamelCase, or snake_case
			{
				selector: 'objectLiteralProperty',
				format: ['PascalCase', 'strictCamelCase', 'snake_case'],
			},

			// Function rules
			{
				selector: 'function',
				format: ['strictCamelCase'],
				leadingUnderscore: 'allowSingleOrDouble',
			},

			// Allow any format for quoted object properties
			{
				selector: 'property',
				modifiers: ['requiresQuotes'],
				format: null,
			},

			{
				selector: 'objectLiteralProperty',
				modifiers: ['requiresQuotes'],
				format: null,
			},

			{
				selector: 'objectLiteralMethod',
				modifiers: ['requiresQuotes'],
				format: null,
			},
		],
	},
};

export const final = () => setDefaultFiles(finalRules);
