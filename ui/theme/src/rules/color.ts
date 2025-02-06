import { isNonEmptyString } from '@libs/standard/string';
import { getColorValue } from '../utils/colors';
import type { Rule } from 'unocss';
import type { Theme } from '../theme';

export const colorRules: Rule<Theme>[] = [
	[
		/^color-(.+)$/,
		([, color], { theme }) => {
			const colorValue = getColorValue(color, theme);

			if (isNonEmptyString(colorValue)) {
				return {
					color: colorValue,
				};
			}
		},
	],
	[
		/^bg-(.+)$/,
		([, color], { theme }) => {
			const colorValue = getColorValue(color, theme);

			if (isNonEmptyString(colorValue)) {
				return {
					backgroundColor: colorValue,
				};
			}
		},
	],
];
