import { concat, style } from '../utils/style';
import type { Theme } from '../theme';

export const formPreflight = {
	getCSS: ({ theme }: { theme: Theme }) => {
		return concat(
			style('*:focus-visible, .focus-visible *:focus', {
				'outline': 'none',
				'--un-ring-width': theme.ringWidth['2'],
				'--un-ring-color': theme.colors.blue['400']!,
				'--un-ring-offset-width': theme.width['2'],
				'--un-ring-offset-color': theme.colors.background,
				'--un-ring-offset-shadow': 'var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)',
				'--un-ring-shadow': 'var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color)',
				'boxShadow': 'var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)',
			}),
		);
	},
};
