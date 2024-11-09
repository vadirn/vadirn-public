import { monorepo } from '@workspace/monorepo';
import pluginImportX from 'eslint-plugin-import-x';
import { setDefaultFiles } from './utils.js';

export const project = [
	monorepo.resolve('tsconfig.json'),
	monorepo.apps('*', 'tsconfig.json'),
	monorepo.core('*', 'tsconfig.json'),
	monorepo.tools('*', 'tsconfig.json'),
	monorepo.libs('*', 'tsconfig.json'),
	monorepo.ui('*', 'tsconfig.json'),
];

export const deps = () => setDefaultFiles({
	settings: {
		'import-x/parsers': {
			'svelte-eslint-parser': ['.svelte'],
			'@typescript-eslint/parser': ['.ts'],
			'espree': ['.js'],
		},
		'import-x/resolver': {
			'eslint-import-resolver-typescript': {
				projectService: true,
			},
		},
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
		'import-x/no-unresolved': ['error', { ignore: ['^\\$app\\W'] }],
	},
});
