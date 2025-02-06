import { assert } from '@libs/standard/error';
import { cssVar, rem } from '../utils/style';

export const fontFamilies = {
	'--font-sans': ([
		'ui-sans-serif',
		'system-ui',
		'sans-serif',
		'\'Apple Color Emoji\'',
		'\'Segoe UI Emoji\'',
		'\'Segoe UI Symbol\'',
		'\'Noto Color Emoji\'',
	]).join(', '),

	'--font-mono': [
		'ui-monospace',
		'SFMono-Regular',
		'Menlo',
		'Monaco',
		'Consolas',
		'\'Liberation Mono\'',
		'\'Courier New\'',
		'monospace',
	].join(', '),
} as const;

type ExtractFontFamilyKey<T>
	= T extends `--font-${infer K}` ? K : never;
type FontFamilyKey
	= ExtractFontFamilyKey<keyof typeof fontFamilies>;

export const getFontFamilyVar = <T extends FontFamilyKey>(key: T) => {
	const fontFamilyVariable = `--font-${key}`;

	assert(
		fontFamilyVariable in fontFamilies,
		`Invalid font family key: ${fontFamilyVariable}`,
	);

	return cssVar(fontFamilyVariable) as `var(--font-${T})`;
};

export const fontSizes = {
	'--font-size-title': rem(34),
	'--font-size-heading': rem(20),
	'--font-size-body': rem(16),
	'--font-size-mono': rem(14),
	'--font-size-small': rem(12),
} as const;

type ExtractFontSizeKey<T>
	= T extends `--font-size-${infer K}` ? K : never;
type FontSizeKey
	= ExtractFontSizeKey<keyof typeof fontSizes>;

export const getFontSizeVar
	= <T extends FontSizeKey>(key: T) => {
		const fontSizeVariable = `--font-size-${key}`;

		assert(
			fontSizeVariable in fontSizes,
			`Invalid font size key: ${fontSizeVariable}`,
		);

		return cssVar(fontSizeVariable) as `var(--font-size-${T})`;
	};

export const lineHeights = {
	'--line-height-title': rem(40),
	'--line-height-heading': rem(24),
	'--line-height-body': rem(20),
	'--line-height-small': rem(16),
} as const;

type ExtractLineHeightKey<T>
	= T extends `--line-height-${infer K}` ? K : never;
type LineHeightKey
	= ExtractLineHeightKey<keyof typeof lineHeights>;

export const getLineHeightVar
	= <T extends LineHeightKey>(key: T) => {
		const lineHeightVariable = `--line-height-${key}`;

		assert(
			lineHeightVariable in lineHeights,
			`Invalid line height key: ${lineHeightVariable}`,
		);

		return cssVar(lineHeightVariable) as `var(--line-height-${T})`;
	};

export const fontWeights = {
	'--font-weight-100': '100',
	'--font-weight-200': '200',
	'--font-weight-300': '300',
	'--font-weight-400': '400',
	'--font-weight-500': '500',
	'--font-weight-600': '600',
	'--font-weight-700': '700',
	'--font-weight-800': '800',
	'--font-weight-900': '900',
	'--font-weight-thin': '100',
	'--font-weight-extralight': '200',
	'--font-weight-light': '300',
	'--font-weight-normal': '400',
	'--font-weight-medium': '500',
	'--font-weight-semibold': '600',
	'--font-weight-bold': '700',
	'--font-weight-extrabold': '800',
	'--font-weight-black': '900',
} as const;

type ExtractFontWeightKey<T>
	= T extends `--font-weight-${infer K}` ? K : never;
type FontWeightKey
	= ExtractFontWeightKey<keyof typeof fontWeights>;

export const getFontWeightVar
	= <T extends FontWeightKey>(key: T) => {
		const fontWeightVariable = `--font-weight-${key}`;

		assert(
			fontWeightVariable in fontWeights,
			`Invalid font weight key: ${fontWeightVariable}`,
		);

		return cssVar(fontWeightVariable) as `var(--font-weight-${T})`;
	};

export const letterSpacings = {
	'--letter-spacing-tight': '-0.05ch',
	'--letter-spacing-normal': '0',
	'--letter-spacing-wide': '0.05ch',
} as const;

type ExtractLetterSpacingKey<T>
	= T extends `--letter-spacing-${infer K}` ? K : never;
type LetterSpacingKey
	= ExtractLetterSpacingKey<keyof typeof letterSpacings>;

export const getLetterSpacingVar = <T extends LetterSpacingKey>(key: T) => {
	const letterSpacingVariable = `--letter-spacing-${key}`;

	assert(
		letterSpacingVariable in letterSpacings,
		`Invalid letter spacing key: ${letterSpacingVariable}`,
	);

	return cssVar(letterSpacingVariable) as `var(--letter-spacing-${T})`;
};
