import { isPropertyOf } from '@libs/standard/object';
import type { Rule } from 'unocss';
import type { Theme } from '../theme';

export const typographyRules: Rule<Theme>[] = [
	[
		/^font-family-(.+)$/,
		([, fontFamily], { theme }) => {
			if (isPropertyOf(fontFamily, theme.fontFamily)) {
				return {
					fontFamily: theme.fontFamily[fontFamily],
				};
			}
		},
	],
	[
		/^font-size-(.+)$/,
		([, size], { theme }) => {
			if (isPropertyOf(size, theme.fontSize)) {
				return {
					fontSize: theme.fontSize[size],
				};
			}
		},
	],
	[
		/^line-height-(.+)$/,
		([, lineHeight], { theme }) => {
			if (isPropertyOf(lineHeight, theme.lineHeight)) {
				return {
					lineHeight: theme.lineHeight[lineHeight],
				};
			}
		},
	],
	[
		/^font-weight-(.+)$/,
		([, fontWeight], { theme }) => {
			if (isPropertyOf(fontWeight, theme.fontWeight)) {
				return {
					fontWeight: theme.fontWeight[fontWeight],
				};
			}
		},
	],
];
