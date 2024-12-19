import { defineConfig } from 'unocss';
import presetMini from '@unocss/preset-mini';
import extractorSvelte from '@unocss/extractor-svelte';
import { theme } from './theme';
import { rules } from './rules';
import { preflights } from './preflights';
import { shortcuts } from './shortcuts';

export const unocssConfig = defineConfig({
	presets: [presetMini()],
	extendTheme: () => {
		return theme;
	},
	rules,
	extractors: [extractorSvelte()],
	preflights,
	shortcuts,

});
