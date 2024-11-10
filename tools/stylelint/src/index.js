/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard', 'stylelint-config-html/svelte'],
	plugins: ['@stylistic/stylelint-plugin'],
	overrides: [{
		files: ['**/*.svelte', '**/*.html'],
		customSyntax: 'postcss-html',
	}],
	rules: {
		'@stylistic/indentation': 'tab',
		'@stylistic/max-line-length': 80,
		'import-notation': null,
		'at-rule-no-unknown': [true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'layer',
					'config',
				],
			}],
		'function-no-unknown': [true,
			{
				ignoreFunctions: [
					'theme', 'layer',
				],
			}],
		'selector-pseudo-class-no-unknown': [true,
			{
				ignorePseudoClasses: [
					'global',
				],
			}],

	},
};
