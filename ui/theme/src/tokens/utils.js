/** @enum {number} */
export const Themes = {
	Light: 0,
	Dark: 1,
};

export function extractTheme(colorVars, theme) {
	return Object.fromEntries(
		Object.entries(colorVars).map(([key, [light, dark]]) => [
			key,
			theme === Themes.Light ? light : dark,
		]),
	);
}

export function getTokensFromColors(colors) {
	return Object.fromEntries(
		Object.entries(colors).map(([key, value]) => [
			key,
			rgba(hexToRgbString(value)),
		]),
	);
}

/**
 * @param {string} value
 * @returns {string}
 */
export function rgba(value) {
	return `rgba(${value}, <alpha-value>)`;
}

/**
 * @param {string} hex
 * @returns {string}
 */
export function hexToRgbString(hex) {
	const fullHex = ensureHex(hex);
	const r = parseInt(fullHex.slice(1, 3), 16);
	const g = parseInt(fullHex.slice(3, 5), 16);
	const b = parseInt(fullHex.slice(5, 7), 16);

	return [r, g, b].join(', ');
}

/**
 * @param {string} color
 * @returns {string}
 */
function ensureHex(color) {
	if (!color.startsWith('#')) throw new Error('Invalid color');
	if (color.length === 4) {
		return [
			'#',
			color[1],
			color[1],
			color[2],
			color[2],
			color[3],
			color[3],
		].join('');
	}

	return color;
}
