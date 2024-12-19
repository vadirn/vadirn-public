import { concat, mediaQueryDark, style, where } from '../utils/style';
import type { Theme } from '../theme';

export const defaultsPreflight = {
	getCSS: ({ theme }: { theme: Theme }) => {
		return concat(
			style(where('body'), {
				fontFamily: theme.fontFamily.sans,
				fontSize: theme.fontSize.body,
				lineHeight: theme.lineHeight.body,
			}),
			style('a', {
				color: theme.colors.inherit,
				textDecoration: 'underline',
				textDecorationColor: theme.colors.inherit,
				textDecorationThickness: theme.lineWidth.thin,
				textDecorationStyle: 'solid',
				textUnderlineOffset: theme.spacing[2],
			}),
			style('#modals', {
				display: 'none',
			}),
			style('#modals:has(*)', {
				display: 'flex',
				flexDirection: 'column',
				position: 'fixed',
				inset: '0',
				overflowY: 'scroll',
			}),
			style('.dark .shiki, .dark .shiki span', {
				color: 'var(--shiki-dark) !important',
				backgroundColor: 'var(--shiki-dark-bg) !important',
			}),
			style(mediaQueryDark(), style('.shiki, .shiki span', {
				color: 'var(--shiki-dark) !important',
				backgroundColor: 'var(--shiki-dark-bg) !important',
			})),
		);
	},
};
