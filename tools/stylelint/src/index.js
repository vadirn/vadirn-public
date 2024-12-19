/** @type {import('stylelint').Config} */
export default {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-recess-order',
		'stylelint-config-html/svelte',
	],
	plugins: ['@stylistic/stylelint-plugin', 'stylelint-gamut'],
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
					'theme',
					'variant',
					'screen',
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
					'local',
				],
			}],
		'custom-property-pattern': null,
		'hue-degree-notation': null,
		'gamut/color-no-out-gamut-range': true,
		'function-disallowed-list': ['rgba', 'hsla', 'rgb', 'hsl'],
		'color-function-notation': 'modern',
		'color-no-hex': true,
	},
};
