import { concat, mediaQueryDark, style, supports } from '../utils/style';
import type { Theme } from '../theme';

export const defaultsPreflight = {
	getCSS: ({ theme }: { theme: Theme }) => {
		return concat(
			style('body', {
				fontFamily: theme.fontFamily.sans,
				fontSize: theme.fontSize.body,
				lineHeight: theme.lineHeight.body,
				minHeight: theme.height.svh,
				color: theme.colors.black,
				backgroundColor: theme.colors.white,
				overflow: 'scroll',
			}),
			style(supports('scrollbar-gutter: stable'), style('body', {
				overflow: 'auto',
				scrollbarGutter: 'stable',
			})),
			style('.dark body', {
				backgroundColor: theme.colors.black,
				color: theme.colors.white,
			}),
			style('a', {
				color: theme.colors.inherit,
				textDecoration: 'underline',
				textDecorationColor: theme.colors.inherit,
				textDecorationThickness: theme.lineWidth.thin,
				textDecorationStyle: 'solid',
				textUnderlineOffset: theme.spacing[2],
			}),
			style('.dark', style('.shiki, .shiki span', {
				color: 'var(--shiki-dark) !important',
				backgroundColor: 'var(--shiki-dark-bg) !important',
			})),
			style(mediaQueryDark(), style('.shiki, .shiki span', {
				color: 'var(--shiki-dark) !important',
				backgroundColor: 'var(--shiki-dark-bg) !important',
			})),
			style('code', {
				fontFamily: theme.fontFamily.mono,
				fontSize: theme.fontSize.mono,
				lineHeight: theme.lineHeight.body,
			}),
			style('a', {
				color: theme.colors.inherit,
				textDecoration: 'underline',
				textDecorationColor: theme.colors.current,
				textDecorationThickness: theme.lineWidth.thin,
				textDecorationStyle: 'solid',
				textUnderlineOffset: theme.spacing[2],
			}),
			style('a:hover', {
				opacity: '0.6',
			}),
			style('b', {
				fontWeight: theme.fontWeight.bold,
			}),
		);
	},
};
