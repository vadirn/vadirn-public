import { isPropertyOf } from '@libs/standard/object';
import { negative } from '../utils/style';
import type { Rule } from 'unocss';
import type { Theme } from '../theme';

export const spacingRules: Rule<Theme>[] = [
	[
		/^p(x|y)-(.+)$/,
		([, axis, spacing], { theme }) => {
			const axes = {
				x: ['padding-left', 'padding-right'],
				y: ['padding-top', 'padding-bottom'],
			} as const;

			if (
				isPropertyOf(spacing, theme.spacing)
				&& isPropertyOf(axis, axes)
			) {
				return {
					[axes[axis][0]]: theme.spacing[spacing],
					[axes[axis][1]]: theme.spacing[spacing],
				};
			}
		},
	],
	[
		/^p-(inline|block)-(.+)$/,
		([, direction, spacing], { theme }) => {
			const directions = {
				inline: 'padding-inline',
				block: 'padding-block',
			} as const;

			if (
				isPropertyOf(spacing, theme.spacing)
				&& isPropertyOf(direction, directions)
			) {
				return {
					'padding-inline': theme.spacing[spacing],
				};
			}
		},
	],
	[
		/^p(t|b|l|r)-(.+)$/,
		([, side, spacing], { theme }) => {
			const sides = {
				t: 'padding-top',
				b: 'padding-bottom',
				l: 'padding-left',
				r: 'padding-right',
			} as const;

			if (
				isPropertyOf(spacing, theme.spacing)
				&& isPropertyOf(side, sides)
			) {
				return {
					[sides[side]]: theme.spacing[spacing],
				};
			}
		},
	],
	[
		/^p-(.+)$/,
		([, spacing], { theme }) => {
			if (isPropertyOf(spacing, theme.spacing)) {
				return {
					padding: theme.spacing[spacing],
				};
			}
		},
	],
	[
		/^-?m(x|y)-(.+)$/,
		([match, axis, spacing], { theme }) => {
			const isNegative = match.startsWith('-');
			const axes = {
				x: ['margin-left', 'margin-right'],
				y: ['margin-top', 'margin-bottom'],
			} as const;

			if (
				isPropertyOf(spacing, theme.spacing)
				&& isPropertyOf(axis, axes)
			) {
				const value = isNegative
					? negative(theme.spacing[spacing])
					: theme.spacing[spacing];

				return {
					[axes[axis][0]]: value,
					[axes[axis][1]]: value,
				};
			}
		},
	],
	[
		/^m-(inline|block)-(.+)$/,
		([, direction, spacing], { theme }) => {
			const directions = {
				inline: 'margin-inline',
				block: 'margin-block',
			} as const;

			if (
				isPropertyOf(spacing, theme.spacing)
				&& isPropertyOf(direction, directions)
			) {
				return {
					[directions[direction]]: theme.spacing[spacing],
				};
			}
		},
	],
	[
		/^m(t|b|l|r)-(.+)$/,
		([, side, spacing], { theme }) => {
			const sides = {
				t: 'margin-top',
				b: 'margin-bottom',
				l: 'margin-left',
				r: 'margin-right',
			} as const;

			if (
				isPropertyOf(spacing, theme.spacing)
				&& isPropertyOf(side, sides)
			) {
				return {
					[sides[side]]: theme.spacing[spacing],
				};
			}
		},
	],
	[
		/^m-(.+)$/,
		([, spacing], { theme }) => {
			if (isPropertyOf(spacing, theme.spacing)) {
				return {
					margin: theme.spacing[spacing],
				};
			}
		},
	],
	[
		/^gap-(.+)$/,
		([, spacing], { theme }) => {
			if (isPropertyOf(spacing, theme.spacing)) {
				return {
					gap: theme.spacing[spacing],
				};
			}
		},
	],
	[
		/^gap-(x|y)-(.+)$/,
		([, axis, spacing], { theme }) => {
			const axes = {
				x: 'column-gap',
				y: 'row-gap',
			} as const;

			if (
				isPropertyOf(spacing, theme.spacing)
				&& isPropertyOf(axis, axes)
			) {
				return {
					[axes[axis]]: theme.spacing[spacing],
				};
			}
		},
	],
];
