import { colorVariables } from '../preflights/colors';
import { cssVar } from '../utils/style';

type ColorVariants = {
	50?: string;
	100?: string;
	200?: string;
	300?: string;
	400?: string;
	500?: string;
	600?: string;
	700?: string;
	800?: string;
	900?: string;
};

type ColorTokens = {
	inherit: 'inherit';
	current: 'currentColor';
	transparent: 'transparent';
	white: string;
	black: string;
	grey: ColorVariants;
	red: ColorVariants;
	yellow: ColorVariants;
	green: ColorVariants;
	blue: ColorVariants;
	neutral: ColorVariants;
	background: string;
	foreground: string;
};

export const colors = getColorTokens(colorVariables);

// from colorVariables form color tokens
function getColorTokens(colors: typeof colorVariables) {
	const colorTokens: Partial<ColorTokens> = {
		inherit: 'inherit',
		current: 'currentColor',
		transparent: 'transparent',
	};

	for (const colorVariable of keys(colors)) {
		const [colorName, variant] = getColorPath(colorVariable);

		if (!colorName) {
			throw new Error(`Invalid color variable: ${colorVariable}`);
		}

		if (!variant) {
			colorTokens[colorName] = cssVar(colorVariable);
			continue;
		}

		colorTokens[colorName] ??= {} as ColorVariants;
		if (typeof colorTokens[colorName] !== 'object') continue;

		colorTokens[colorName][variant] = cssVar(colorVariable);
	}

	return colorTokens as ColorTokens;
}

function getColorPath<ColorVariable extends string>(
	colorVariable: ColorVariable,
) {
	if (colorVariable.startsWith('--color-')) {
		const parts = colorVariable.replace('--color-', '').split('-') as
		ColorVariable extends `--color-${infer Color}` ?
			Color extends `${infer ColorName}-${infer ColorVariant}` ?
					[ColorName, ColorVariant]
				: [Color]
			: never;

		return parts;
	}
	throw new Error(`Invalid color variable: ${colorVariable}`);
}

function keys<T extends Record<string, unknown>>(obj: T) {
	return Object.keys(obj) as (keyof T)[];
}
