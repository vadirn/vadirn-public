import { defineConfig, transformerVariantGroup, type Preset } from 'unocss';
import presetMini from '@unocss/preset-mini';
import extractorSvelte from '@unocss/extractor-svelte';
import { theme, type Theme } from './theme';
import { rules } from './rules';
import { preflights } from './preflights';
import { shortcuts } from './shortcuts';

const configuredPresetMini = presetMini({
	dark: {
		// :global is required for utility styles to work in svelte
		light: ':global(.light)',
		dark: ':global(.dark)',
	},
}) as unknown as Preset<Theme>;

export const unocssConfig = defineConfig({
	presets: [configuredPresetMini],
	extendTheme: () => {
		return theme;
	},
	rules,
	extractors: [extractorSvelte()],
	preflights,
	shortcuts,
	transformers: [
		transformerVariantGroup(),
		{
			name: 'cleanup-global-dark',
			idFilter(id) {
				return !id.match(/\.svelte$/);
			},
			async transform(code) {
				// compensate for :global(.dark) and :global(.light) selectors
				// that were attached for svelte
				code.replaceAll(':global(.dark)', '.dark');
				code.replaceAll(':global(.light)', '.light');
			},
		},
	],
});
