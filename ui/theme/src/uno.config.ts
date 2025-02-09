import extractorSvelte from '@unocss/extractor-svelte';
import {
	defineConfig,
	transformerVariantGroup,
} from 'unocss';
import { preflights } from './preflights';
import { rules } from './rules';
import { shortcuts } from './shortcuts';
import { type Theme, theme } from './theme';
import { variants } from './variants';

export const unocssConfig = defineConfig<Theme>({
	presets: [],
	theme,
	preflights,
	shortcuts,
	rules,
	variants,
	extractors: [extractorSvelte()],
	transformers: [
		transformerVariantGroup(),
	],
});
