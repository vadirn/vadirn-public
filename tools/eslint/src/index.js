import * as JsEslintPluginModule from '@eslint/js';
import { monorepo } from '@vadirn/monorepo';
import globals from 'globals';
import {
	parser,
	configs as tsConfigs,
} from 'typescript-eslint';
import { deps, project } from './deps.js';
import { style } from './style.js';
import { svelte } from './svelte.js';
import { setFiles } from './utils.js';

const jsConfigs = JsEslintPluginModule.default.configs;

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
	...setFiles(
		jsConfigs.recommended,
		...tsConfigs.recommended,
	),
	...svelte(),
	...deps(),
	...style(),
	...setFiles({
		rules: {
			'@typescript-eslint/no-unused-vars': 'error',
		},
	}),
];
