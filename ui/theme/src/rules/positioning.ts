import { isPropertyOf } from '@libs/standard/object';
import { negative } from '../utils/style';
import type { Rule } from 'unocss';
import type { Theme } from '../theme';

export const positioningRules: Rule<Theme>[] = [
	['absolute', { position: 'absolute' }],
	['relative', { position: 'relative' }],
	['fixed', { position: 'fixed' }],
	['sticky', { position: 'sticky' }],
	[
		/^-?(top|bottom|left|right)-(.+)$/,
		([match, side, spacing], { theme }) => {
			const isNegative = match.startsWith('-');

			const sides = {
				top: 'top',
				bottom: 'bottom',
				left: 'left',
				right: 'right',
			};

			if (
				isPropertyOf(theme.spacing, spacing)
				&& isPropertyOf(sides, side)
			) {
				return {
					[sides[side]]: isNegative
						? negative(theme.spacing[spacing])
						: theme.spacing[spacing],
				};
			}
		},
	],
	[
		/^-?inset-(.+)$/,
		([match, spacing], { theme }) => {
			const isNegative = match.startsWith('-');

			if (isPropertyOf(theme.spacing, spacing)) {
				return {
					inset: isNegative
						? negative(theme.spacing[spacing])
						: theme.spacing[spacing],
				};
			}
		},
	],
];
