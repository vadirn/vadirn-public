export const stylisticBase = {
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
		'@stylistic/function-call-argument-newline': [
			'error',
			'consistent',
		],
		'@stylistic/function-paren-newline': ['error', 'consistent'],
		'@stylistic/generator-star-spacing': [
			'error',
			{ before: true, after: true },
		],
		'@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
		'@stylistic/max-len': [
			'error',
			{
				code: 80,
				tabWidth: 2,
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
		'max-lines-per-function': ['error', { max: 60, skipBlankLines: true }],
		'max-lines': [
			'error',
			{
				max: 150,
				skipBlankLines: true,
				skipComments: true,
			},
		],
	},
};
