import { isPropertyOf } from '@libs/standard/object';
import type { Rule } from 'unocss';
import type { Theme } from '../theme';

export const typographyRules: Rule<Theme>[] = [
	[
		/^font-family-(.+)$/,
		([, fontFamily], { theme }) => {
			if (isPropertyOf(theme.fontFamily, fontFamily)) {
				return {
					'font-family': theme.fontFamily[fontFamily],
				};
			}
		},
	],
	[
		/^font-size-(.+)$/,
		([, size], { theme }) => {
			if (isPropertyOf(theme.fontSize, size)) {
				return {
					'font-size': theme.fontSize[size],
				};
			}
		},
	],
	[
		/^line-height-(.+)$/,
		([, lineHeight], { theme }) => {
			if (isPropertyOf(theme.lineHeight, lineHeight)) {
				return {
					'line-height': theme.lineHeight[lineHeight],
				};
			}
		},
	],
	[
		/^font-weight-(.+)$/,
		([, fontWeight], { theme }) => {
			if (isPropertyOf(theme.fontWeight, fontWeight)) {
				return {
					'font-weight': theme.fontWeight[fontWeight],
				};
			}
		},
	],
];
