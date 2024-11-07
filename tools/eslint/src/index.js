import { monorepo } from '@workspace/monorepo';
import globals from 'globals';
import { parser } from 'typescript-eslint';
import { deps, project } from './deps.js';
import { recommended } from './recommended.js';
import { style } from './style.js';
import { svelte } from './svelte.js';

export default [
	{ ignores: ['**/.*', 'build/**/*', '.svelte-kit/**/*', 'dist/**/*'] },
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				ecmaVersion: 'latest',
				parser,
				project,
				tsconfigRootDir: monorepo.root,
				sourceType: 'module',
				extraFileExtensions: ['.svelte'],
			},
		},
	},
	...recommended(),
	...svelte(),
	...deps(),
	...style(),
];
