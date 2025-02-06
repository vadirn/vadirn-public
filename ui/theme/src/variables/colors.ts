import { isNonEmptyString } from '@libs/standard/string';
import { assert } from '@libs/standard/error';
import { cssVar } from '../utils/style';

export const colors = {
	'--color-white': 'oklch(100% 0 0)',
	'--color-black': 'oklch(0% 0 0)',
	'--color-grey-50': 'oklch(96% 0 0)',
	'--color-grey-100': 'oklch(90% 0 0)',
	'--color-grey-200': 'oklch(81.25% 0 0)',
	'--color-grey-300': 'oklch(72.5% 0 0)',
	'--color-grey-400': 'oklch(63.75% 0 0)',
	'--color-grey-500': 'oklch(55% 0 0)',
	'--color-grey-600': 'oklch(46.25% 0 0)',
	'--color-grey-700': 'oklch(37.5% 0 0)',
	'--color-grey-800': 'oklch(28.75% 0 0)',
	'--color-grey-900': 'oklch(20% 0 0)',
	'--color-red-50': 'oklch(96% 0.01 31)',
	'--color-red-100': 'oklch(90% 0.05 31)',
	'--color-red-200': 'oklch(81.25% 0.1 31)',
	'--color-red-300': 'oklch(72.5% 0.16 31)',
	'--color-red-400': 'oklch(63.75% 0.16 31)',
	'--color-red-500': 'oklch(55% 0.16 31)',
	'--color-red-600': 'oklch(46.25% 0.16 31)',
	'--color-red-700': 'oklch(37.5% 0.14 31)',
	'--color-red-800': 'oklch(28.75% 0.11 31)',
	'--color-red-900': 'oklch(20% 0.07 31)',
	'--color-yellow-100': 'oklch(90% 0.11 86)',
	'--color-yellow-200': 'oklch(81.25% 0.16 86)',
	'--color-yellow-300': 'oklch(72.5% 0.14 86)',
	'--color-yellow-400': 'oklch(63.75% 0.13 86)',
	'--color-yellow-500': 'oklch(55% 0.11 86)',
	'--color-yellow-600': 'oklch(46.25% 0.09 86)',
	'--color-yellow-700': 'oklch(37.5% 0.07 86)',
	'--color-yellow-800': 'oklch(28.75% 0.05 86)',
	'--color-yellow-900': 'oklch(20% 0.04 86)',
	'--color-green-100': 'oklch(90% 0.13 130)',
	'--color-green-200': 'oklch(81.25% 0.13 130)',
	'--color-green-300': 'oklch(72.5% 0.13 130)',
	'--color-green-400': 'oklch(63.75% 0.13 130)',
	'--color-green-500': 'oklch(55% 0.13 130)',
	'--color-green-600': 'oklch(46.25% 0.12 130)',
	'--color-green-700': 'oklch(37.5% 0.1 130)',
	'--color-green-800': 'oklch(28.75% 0.07 130)',
	'--color-green-900': 'oklch(20% 0.05 130)',
	'--color-blue-100': 'oklch(90% 0.05 245)',
	'--color-blue-200': 'oklch(81.25% 0.1 245)',
	'--color-blue-300': 'oklch(72.5% 0.13 245)',
	'--color-blue-400': 'oklch(63.75% 0.13 245)',
	'--color-blue-500': 'oklch(55% 0.13 245)',
	'--color-blue-600': 'oklch(46.25% 0.11 245)',
	'--color-blue-700': 'oklch(37.5% 0.09 245)',
	'--color-blue-800': 'oklch(28.75% 0.07 245)',
	'--color-blue-900': 'oklch(20% 0.05 245)',
	'--color-neutral-100': 'var(--color-grey-100)',
	'--color-neutral-200': 'var(--color-grey-200)',
	'--color-neutral-300': 'var(--color-grey-300)',
	'--color-neutral-400': 'var(--color-grey-400)',
	'--color-neutral-500': 'var(--color-grey-500)',
	'--color-neutral-600': 'var(--color-grey-600)',
	'--color-neutral-700': 'var(--color-grey-700)',
	'--color-neutral-800': 'var(--color-grey-800)',
	'--color-neutral-900': 'var(--color-grey-900)',
	'--color-background': 'var(--color-white)',
	'--color-foreground': 'var(--color-black)',
} as const;

export const darkModeColors = {
	'--color-neutral-100': 'var(--color-grey-900)',
	'--color-neutral-200': 'var(--color-grey-800)',
	'--color-neutral-300': 'var(--color-grey-700)',
	'--color-neutral-400': 'var(--color-grey-600)',
	'--color-neutral-500': 'var(--color-grey-500)',
	'--color-neutral-600': 'var(--color-grey-400)',
	'--color-neutral-700': 'var(--color-grey-300)',
	'--color-neutral-800': 'var(--color-grey-200)',
	'--color-neutral-900': 'var(--color-grey-100)',
	'--color-background': 'var(--color-grey-900)',
	'--color-foreground': 'var(--color-white)',
} as const;

type ColorVariable = keyof typeof colors;
type ExtractColorName<T>
	= T extends `--color-${infer ColorName}-${string}`
		? ColorName
		: T extends `--color-${infer ColorName}`
			? ColorName
			: never;
type BaseColor = ExtractColorName<ColorVariable>;
type ExtractColorVariant<T extends BaseColor, C extends ColorVariable>
	= C extends `--color-${T}-${infer Variant}`
		? Variant
		: never;
export type ColorVariant<C extends BaseColor>
	= ExtractColorVariant<C, ColorVariable>;
export type ColorWithVariants = {
	[K in BaseColor]: ExtractColorVariant<K, ColorVariable> extends never
		? never
		: K
}[BaseColor];
export type ColorWithoutVariants = {
	[K in BaseColor]: ExtractColorVariant<K, ColorVariable> extends never
		? K
		: never
}[BaseColor];

export const getColorVar: {
	<C extends ColorWithoutVariants>(colorName: C): `var(--color-${C})`;
	<
		C extends ColorWithVariants,
		V extends ExtractColorVariant<C, ColorVariable>,
	>(
		colorName: C,
		colorVariant: V
	): `var(--color-${C}-${V})`;
} = (colorName: string, colorVariant?: string) => {
	const colorVariable
		= `--color-${[
			colorName,
			colorVariant,
		].filter(isNonEmptyString).join('-')}` as ColorVariable;

	assert(colorVariable in colors, `Invalid color name: ${colorVariable}`);

	return cssVar(colorVariable) as typeof colorVariant extends undefined
		? `var(--color-${string})`
		: `var(--color-${string}-${string})`;
};
