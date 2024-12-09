import { monorepo } from '@tools/monorepo';
import plugin from 'tailwindcss/plugin.js';
import { colorTokens, themeBase } from './tokens/colors.js';
import { spacing, borderRadius } from './tokens/spacing.js';
import { fontFamily, fontSize } from './tokens/typography.js';

/** @type {import('tailwindcss').Config} */
export const tailwindcss = {
	darkMode: ['variant',
		['@media (prefers-color-scheme: dark) { &:not(.light *) }',
			'&:is(.dark *)',
			'&:is(:global(.dark) *)']],
	content: [
		'./src/**/*.{html,js,svelte,ts,md}',
		monorepo.ui('components', 'src', '**/*.{html,js,svelte,ts,md}'),
	],
	theme: {
		colors: colorTokens,
		spacing,
		borderRadius,
		fontSize,
		fontFamily,
	},
	plugins: [
		plugin(({ addBase }) => {
			addBase(themeBase);
		}),
	],
};
