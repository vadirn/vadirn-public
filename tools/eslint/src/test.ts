import * as JsEslintPluginModule from '@eslint/js';
import { configs as tsConfigs } from 'typescript-eslint';

const jsConfigs = JsEslintPluginModule.default.configs;

export const recommended = () => ([
	...setFiles(
		jsConfigs.recommended,
		...tsConfigs.recommended,
	),
]);
