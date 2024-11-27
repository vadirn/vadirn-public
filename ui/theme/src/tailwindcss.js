import { monorepo } from '@workspace/monorepo';
import plugin from 'tailwindcss/plugin.js';
import { colorTokens, themeBase } from './tokens/colors.js';
import { spacing, borderRadius } from './tokens/spacing.js';
import { fontFamily, fontSize } from './tokens/typography.js';

/** @type {import('tailwindcss').Config} */
export const tailwindcss = {
	darkMode: 'selector',
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
