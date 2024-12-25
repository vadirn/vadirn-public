import JsEslintPlugin from '@eslint/js';
import { configs as tsConfigs } from 'typescript-eslint';
import { setDefaultFiles } from './utils.js';

export const recommended = () => setDefaultFiles(
	JsEslintPlugin.configs.recommended,
	...tsConfigs.recommended,
);
