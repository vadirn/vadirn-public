import { monorepo } from '@vadirn/monorepo';
import pluginImportX from 'eslint-plugin-import-x';

export const project = [
	monorepo.resolve('tsconfig.json'),
	monorepo.apps('*', 'tsconfig.json'),
	monorepo.core('*', 'tsconfig.json'),
	monorepo.tools('*', 'tsconfig.json'),
	monorepo.libs('*', 'tsconfig.json'),
	monorepo.ui('*', 'tsconfig.json'),
];

export const deps = () => ([
	{
		settings: {
			'import-x/parsers': {
				'svelte-eslint-parser': ['.svelte'],
				'@typescript-eslint/parser': ['.ts'],
				'espree': ['.js'],
			},
			'import-x/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project,
				},
			},
		},
		plugins: { 'import-x': pluginImportX },
		rules: {
			...pluginImportX.configs.recommended.rules,
			// 'import/no-unresolved': 'error',
			// 'import/no-unused-modules': 'warn',
		},
	},
]);
