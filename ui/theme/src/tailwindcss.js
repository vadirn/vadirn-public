import plugin from 'tailwindcss/plugin.js';
import { colorTokens, themeBase } from './tokens/colors.js';
import { spacing } from './tokens/spacing.js';
import { fontSize } from './tokens/typography.js';

/** @type {import('tailwindcss').Config} */
export const tailwindcss = {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: colorTokens,
		spacing,
		fontSize,
	},
	plugins: [
		plugin(({ addBase }) => {
			addBase(themeBase);
		}),
	],
};
