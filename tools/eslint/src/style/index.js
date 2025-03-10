import StylisticEslintPlugin from '@stylistic/eslint-plugin';
import { setDefaultFiles } from '../utils.js';
import { stylisticBase } from './base.js';
import { svelteStylisticRules } from './svelte.js';
import { testFilesStylisticRules } from './test.js';

const configs = StylisticEslintPlugin.configs;

export const style = () => ([
	...setDefaultFiles(
		configs['disable-legacy'],
		configs.customize({
			indent: 'tab',
			quotes: 'single',
			semi: true,
			jsx: false,
		}),
		stylisticBase,
	),
	svelteStylisticRules,
	testFilesStylisticRules,
]);
