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
		'at-rule-no-deprecated': [true,
			{
				ignoreAtRules: [
					'apply',
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
		'selector-class-pattern': [
			'^([a-z][a-z0-9]*)(-[a-z0-9]+)*$|^[a-z]+:([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{
				message:
					selector => `Expected class selector "${selector}" `
						+ `to be kebab-case or `
						+ `prefixed with a valid prefix`,
			},
		],
		'custom-property-pattern': null,
		'hue-degree-notation': null,
		'gamut/color-no-out-gamut-range': true,
		'function-disallowed-list': ['rgba', 'hsla', 'rgb', 'hsl'],
		'color-function-notation': 'modern',
		'color-no-hex': true,
	},
};
