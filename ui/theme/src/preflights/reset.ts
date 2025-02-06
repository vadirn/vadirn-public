import { concat, style } from '../utils/style';
import type { Preflight } from 'unocss';
import type { Theme } from '../theme';

export const resetPreflight: Preflight<Theme> = {
	getCSS: () => concat(
		style('*, ::before, ::after', { boxSizing: 'border-box' }),
		style('*', {
			margin: '0',
			padding: '0',
		}),
		style('img, picture, video, canvas, svg', {
			display: 'block',
			maxInlineSize: '100%',
		}),
		style('input, button, textarea, select', {
			font: 'inherit',
			color: 'inherit',
			letterSpacing: 'inherit',
			wordSpacing: 'inherit',
		}),
		style('p, h1, h2, h3, h4, h5, h6', {
			font: 'inherit',
			overflowWrap: 'break-word',
		}),
		style('h1, h2, h3, h4, h5, h6', {
			textWrap: 'balance',
		}),
		style('ol, ul', {
			listStyle: 'none',
		}),
		style('blockquote, q', {
			quotes: 'none',
		}),
		style('blockquote::before, blockquote::after, '
			+ 'q::before, q::after', {
			content: ['\'\'', 'none'],
		}),
		style('table', {
			borderSpacing: '0',
			borderCollapse: 'collapse',
		}),
	),
};
