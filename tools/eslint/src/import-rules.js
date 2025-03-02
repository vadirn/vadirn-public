import { monorepo } from '@tools/monorepo';
import * as importPlugin from 'eslint-plugin-import';
import { globSync } from 'glob';
import { setDefaultFiles } from './utils.js';

// use static paths for config, otherwise some of those might disappear
export const project = [
	monorepo.resolve('tsconfig.json'),
	...globSync(monorepo.apps('*', 'tsconfig.json')),
	...globSync(monorepo.core('*', 'tsconfig.json')),
	...globSync(monorepo.tools('*', 'tsconfig.json')),
	...globSync(monorepo.libs('*', 'tsconfig.json')),
	...globSync(monorepo.ui('*', 'tsconfig.json')),
];

export const importRules = () => setDefaultFiles({
	plugins: { import: importPlugin },
	settings: {
		'import/resolver': {
			typescript: {
				project,
				tsconfigRootDir: monorepo.root,
			},
		},
	},
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parserOptions: {
			parser: {
				'svelte-eslint-parser': ['.svelte'],
				'@typescript-eslint/parser': ['.ts'],
				'espree': ['.js'],
			},
		},
	},
	rules: {
		...importPlugin.flatConfigs.recommended.rules,
		...importPlugin.flatConfigs.recommended.typescript,
		'import/no-named-as-default-member': 'off',
		'import/no-duplicates': 'off',
		'no-duplicate-imports': 'error',
		'import/order': ['error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
					'object',
					'type',
				],
			}],

		// $app is vite alias
		'import/no-unresolved': [
			'error',
			{ ignore: ['^\\$app\\W', '^\\$env\\W'] },
		],
	},
});
