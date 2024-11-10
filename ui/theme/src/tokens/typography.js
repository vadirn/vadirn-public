import defaultTheme from 'tailwindcss/defaultTheme.js';

/** @type {import('tailwindcss').Config['theme']['fontSize']} */
export const fontSize = {
	title:
            [pxToRem(28), { lineHeight: pxToRem(32) }],
	heading:
            [pxToRem(20), { lineHeight: pxToRem(24) }],
	body:
            [pxToRem(16), { lineHeight: pxToRem(20) }],
	caption:
            [pxToRem(12), { lineHeight: pxToRem(14) }],
};

export const fontFamily = {
	serif: [...defaultTheme.fontFamily.serif],
	mono: [...defaultTheme.fontFamily.mono],
	sans: [...defaultTheme.fontFamily.sans],
};

function pxToRem(px) {
	return `${px / 16}rem`;
}
