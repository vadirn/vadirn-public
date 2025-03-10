import { monorepo } from '@tools/monorepo';
import globals from 'globals';
import { parser } from 'typescript-eslint';
import { importRules, project } from './import-rules.js';
import { recommended } from './recommended.js';
import { style } from './style/index.js';
import { svelte } from './svelte.js';
import { final } from './final.js';

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
	...importRules(),
	...style(),
	...final(),
];
