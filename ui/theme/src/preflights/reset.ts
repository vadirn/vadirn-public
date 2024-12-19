import { concat, style, where } from '../utils/style';

export const resetPreflight = {
	getCSS: () => concat(
		style('*, ::before, ::after', { boxSizing: 'border-box' }),
		style(where(
			'html, body, div, span, applet, object, iframe, '
			+ 'h1, h2, h3, h4, h5, h6, p, blockquote, pre, '
			+ 'a, abbr, acronym, address, big, cite, code, '
			+ 'del, dfn, em, img, ins, kbd, q, s, samp, '
			+ 'small, strike, strong, sub, sup, tt, var, '
			+ 'b, u, i, center, '
			+ 'dl, dt, dd, ol, ul, li, '
			+ 'fieldset, form, label, legend, '
			+ 'table, caption, tbody, tfoot, thead, tr, th, td, '
			+ 'article, aside, canvas, details, embed, '
			+ 'figure, figcaption, footer, header, hgroup, '
			+ 'menu, nav, output, ruby, section, summary, '
			+ 'time, mark, audio, video',
		), {
			padding: '0',
			margin: '0',
			font: 'inherit',
			fontSize: '100%',
			verticalAlign: 'baseline',
			border: '0',
		}),
		style(where(
			'article, aside, details, figcaption, figure, '
			+ 'footer, header, hgroup, menu, nav, section',
		), {
			display: 'block',
		}),
		// style(where('body'), {
		// 	lineHeight: '1',
		// }),
		style(where('ol, ul'), {
			listStyle: 'none',
		}),
		style(where('blockquote, q'), {
			quotes: 'none',
		}),
		style(where('blockquote::before, blockquote::after, '
			+ 'q::before, q::after'), {
			content: ['\'\'', 'none'],
		}),
		style(where('table'), {
			borderSpacing: '0',
			borderCollapse: 'collapse',
		}),
	),
};
