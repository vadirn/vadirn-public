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
	black: '#000',
	white: '#fff',
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
	'--color-bg': [rgb(colors.white), rgb(colors.black)],
	'--color-fg': [rgb(colors.black), rgb(colors.white)],
};

/**
 * Tokens for tailwindcss to generate color classes
 */
const themedTokens = {
	bg: rgba('var(--color-bg)'),
	fg: rgba('var(--color-fg)'),
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
