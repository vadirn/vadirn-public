import { isPropertyOf } from '@libs/standard/object';
import type { Rule } from 'unocss';
import type { Theme } from '../theme';

export const sizeRules: Rule<Theme>[] = [
	[
		/^w-(.+)$/,
		([, width], { theme }) => {
			if (isPropertyOf(width, theme.width)) {
				return {
					width: theme.width[width],
				};
			}
		},
	],
	[
		/^min-w-(.+)$/,
		([, width], { theme }) => {
			if (isPropertyOf(width, theme.minWidth)) {
				return {
					minWidth: theme.minWidth[width],
				};
			}
		},
	],
	[
		/^max-w-(.+)$/,
		([, width], { theme }) => {
			if (isPropertyOf(width, theme.maxWidth)) {
				return {
					maxWidth: theme.maxWidth[width],
				};
			}
		},
	],
	[
		/^h-(.+)$/,
		([, height], { theme }) => {
			if (isPropertyOf(height, theme.height)) {
				return {
					height: theme.height[height],
				};
			}
		},
	],
	[
		/^min-h-(.+)$/,
		([, height], { theme }) => {
			if (isPropertyOf(height, theme.minHeight)) {
				return {
					minHeight: theme.minHeight[height],
				};
			}
		},
	],
	[
		/^max-h-(.+)$/,
		([, height], { theme }) => {
			if (isPropertyOf(height, theme.maxHeight)) {
				return {
					maxHeight: theme.maxHeight[height],
				};
			}
		},
	],
];
