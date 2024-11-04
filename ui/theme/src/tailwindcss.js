import plugin from 'tailwindcss/plugin.js';
import { colorTokens, themeBase } from './tokens/colors.js';

/** @type {import('tailwindcss').Config} */
export const tailwindcss = {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: colorTokens,
	},
	plugins: [
		plugin(({ addBase }) => {
			addBase(themeBase);
		}),
	],
};
