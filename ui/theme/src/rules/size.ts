import { isPropertyOf } from '@libs/standard/object';
import type { Rule } from 'unocss';
import type { Theme } from '../theme';

export const sizeRules: Rule<Theme>[] = [
	[
		/^w-(.+)$/,
		([, width], { theme }) => {
			if (isPropertyOf(theme.width, width)) {
				return {
					width: theme.width[width],
				};
			}
		},
	],
	[
		/^min-w-(.+)$/,
		([, width], { theme }) => {
			if (isPropertyOf(theme.minWidth, width)) {
				return {
					'min-width': theme.minWidth[width],
				};
			}
		},
	],
	[
		/^max-w-(.+)$/,
		([, width], { theme }) => {
			if (isPropertyOf(theme.maxWidth, width)) {
				return {
					'max-width': theme.maxWidth[width],
				};
			}
		},
	],
	[
		/^h-(.+)$/,
		([, height], { theme }) => {
			if (isPropertyOf(theme.height, height)) {
				return {
					height: theme.height[height],
				};
			}
		},
	],
	[
		/^min-h-(.+)$/,
		([, height], { theme }) => {
			if (isPropertyOf(theme.minHeight, height)) {
				return {
					'min-height': theme.minHeight[height],
				};
			}
		},
	],
	[
		/^max-h-(.+)$/,
		([, height], { theme }) => {
			if (isPropertyOf(theme.maxHeight, height)) {
				return {
					'max-height': theme.maxHeight[height],
				};
			}
		},
	],
];
