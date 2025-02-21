import { monorepo } from '@tools/monorepo';
import pluginImportX from 'eslint-plugin-import-x';
import {
	createTypeScriptImportResolver,
} from 'eslint-import-resolver-typescript';
import { globSync } from 'glob';
import { setDefaultFiles } from './utils.js';

const { createNodeResolver } = pluginImportX;

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
	settings: {
		'import-x/parsers': {
			'svelte-eslint-parser': ['.svelte'],
			'@typescript-eslint/parser': ['.ts'],
			'espree': ['.js'],
		},
		'import-x/resolver-next': [
			createNodeResolver({
				extensions: ['.mjs', '.cjs', '.js', '.ts', '.svelte'],
			}),
			createTypeScriptImportResolver({
				project,
			}),
		],
	},
	plugins: { 'import-x': pluginImportX },
	rules: {
		...pluginImportX.configs.recommended.rules,
		'import-x/no-named-as-default-member': 'off',
		'import-x/no-duplicates': ['error', { considerQueryString: true }],
		'import-x/order': ['error',
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
		// disable no-unresolved until https://github.com/un-ts/eslint-plugin-import-x/issues/40?ysclid=m393mkvkc718566676
		// $app is vite alias
		'import-x/no-unresolved': [
			'error',
			{ ignore: ['^\\$app\\W', '^\\$env\\W'] },
		],
	},
});
