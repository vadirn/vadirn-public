import {
	extractTheme,
	getTokensFromColors,
	hexToRgbString as rgb,
	rgba,
	Themes,
} from './utils.js';

/**
 * Colors
 */
const colors = {
	gray: {
		100: '#fcfcfc',
		200: '#d4d4d4',
		300: '#aeaeae',
		400: '#898989',
		500: '#666666',
		600: '#454545',
		700: '#262626',
		800: '#0b0b0b',
		900: '#030303',
	},
	orange: '#fe6135',

	green: '#24af32',
	red: '#ff5d50',
	yellow: '#f9ad00',
	blue: '#00a8f7',
};

/**
 * Color tokens for tailwindcss
 * @type {Record<string, string>}
 */
const staticColorTokens = {
	inherit: 'inherit',
	transparent: 'transparent',
	current: 'currentColor',
	...getTokensFromColors(colors),
};

/**
 * Themed colors (light/dark), that automatically switch between light and dark
 * based on the user's preference.
 */
const colorVars = {
	'--color-neutral-100': [rgb(colors.gray[100]), rgb(colors.gray[900])],
	'--color-neutral-200': [rgb(colors.gray[200]), rgb(colors.gray[800])],
	'--color-neutral-300': [rgb(colors.gray[300]), rgb(colors.gray[700])],
	'--color-neutral-400': [rgb(colors.gray[400]), rgb(colors.gray[600])],
	'--color-neutral-500': [rgb(colors.gray[500]), rgb(colors.gray[400])],
	'--color-neutral-600': [rgb(colors.gray[600]), rgb(colors.gray[300])],
	'--color-neutral-700': [rgb(colors.gray[700]), rgb(colors.gray[200])],
	'--color-neutral-800': [rgb(colors.gray[800]), rgb(colors.gray[100])],
	'--color-neutral-900': [rgb(colors.gray[900]), rgb(colors.gray[100])],
	'--color-background': [rgb(colors.gray[100]), rgb(colors.gray[700])],
	'--color-foreground': [rgb(colors.gray[900]), rgb(colors.gray[100])],
	'--color-accent': [rgb(colors.orange), rgb(colors.orange)],
	'--color-success': [rgb(colors.green), rgb(colors.green)],
	'--color-warning': [rgb(colors.yellow), rgb(colors.yellow)],
	'--color-error': [rgb(colors.red), rgb(colors.red)],
	'--color-info': [rgb(colors.blue), rgb(colors.blue)],
};

/**
 * Tokens for tailwindcss to generate color classes
 */
const themedTokens = {
	neutral: {
		100: rgba('var(--color-neutral-100)'),
		200: rgba('var(--color-neutral-200)'),
		300: rgba('var(--color-neutral-300)'),
		400: rgba('var(--color-neutral-400)'),
		500: rgba('var(--color-neutral-500)'),
		600: rgba('var(--color-neutral-600)'),
		700: rgba('var(--color-neutral-700)'),
		800: rgba('var(--color-neutral-800)'),
		900: rgba('var(--color-neutral-900)'),
	},
	background: rgba('var(--color-background)'),
	foreground: rgba('var(--color-foreground)'),
	accent: rgba('var(--color-accent)'),
	success: rgba('var(--color-success)'),
	warning: rgba('var(--color-warning)'),
	error: rgba('var(--color-error)'),
	info: rgba('var(--color-info)'),
};

/**
 * All tokens combined
 */
export const colorTokens = {
	...staticColorTokens,
	...themedTokens,
};

/**
 * Light/Dark css selectors
 */
export const themeBase = {
	'html, .light': extractTheme(colorVars, Themes.Light),
	'.dark': extractTheme(colorVars, Themes.Dark),
};
