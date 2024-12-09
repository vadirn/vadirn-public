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
	white: '#ffffff',
	black: '#000000',
	grey: {
		100: '#dedede',
		200: '#c2c2c2',
		300: '#a6a6a6',
		400: '#8b8b8b',
		500: '#717171',
		600: '#595959',
		700: '#414141',
		800: '#2b2b2b',
		900: '#161616',
	},
	red: {
		100: '#ffccc0',
		200: '#ffa08d',
		300: '#fa7b66',
		400: '#db5f4b',
		500: '#bd4331',
		600: '#9f2515',
		700: '#810000',
		800: '#5d0000',
		900: '#380000',
	},
	yellow: {
		100: '#ffd650',
		200: '#f2b800',
		300: '#d49c00',
		400: '#b38300',
		500: '#936a00',
		600: '#755200',
		700: '#573c00',
		800: '#3c2600',
		900: '#221300',
	},
	green: {
		100: '#c1f092',
		200: '#a6d376',
		300: '#8bb65b',
		400: '#719b3f',
		500: '#588021',
		600: '#3f6600',
		700: '#294d00',
		800: '#183300',
		900: '#091c00',
	},
	blue: {
		100: '#b5e4ff',
		200: '#78caff',
		300: '#58aef2',
		400: '#3a92d4',
		500: '#1777b8',
		600: '#005d9b',
		700: '#00447e',
		800: '#002c5a',
		900: '#001638',
	},
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
	'--color-neutral-100': [rgb(colors.grey[100]), rgb(colors.grey[900])],
	'--color-neutral-200': [rgb(colors.grey[200]), rgb(colors.grey[800])],
	'--color-neutral-300': [rgb(colors.grey[300]), rgb(colors.grey[700])],
	'--color-neutral-400': [rgb(colors.grey[400]), rgb(colors.grey[600])],
	'--color-neutral-500': [rgb(colors.grey[500]), rgb(colors.grey[400])],
	'--color-neutral-600': [rgb(colors.grey[600]), rgb(colors.grey[300])],
	'--color-neutral-700': [rgb(colors.grey[700]), rgb(colors.grey[200])],
	'--color-neutral-800': [rgb(colors.grey[800]), rgb(colors.grey[100])],
	'--color-neutral-900': [rgb(colors.grey[900]), rgb(colors.grey[100])],
	'--color-background': [rgb(colors.white), rgb(colors.grey[900])],
	'--color-foreground': [rgb(colors.black), rgb(colors.white)],
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
