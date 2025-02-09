import type { Rule } from 'unocss';
import type { Theme } from '../theme';

export const displayRules: Rule<Theme>[] = [
	['flex', { display: 'flex' }],
	['inline-flex', { display: 'inline-flex' }],
	['flex-row', { 'flex-direction': 'row' }],
	['flex-row-reverse', { 'flex-direction': 'row-reverse' }],
	['flex-col', { 'flex-direction': 'column' }],
	['flex-col-reverse', { 'flex-direction': 'column-reverse' }],
	['flex-wrap', { 'flex-wrap': 'wrap' }],
	['flex-wrap-reverse', { 'flex-wrap': 'wrap-reverse' }],
	['flex-nowrap', { 'flex-wrap': 'nowrap' }],

	['grid', { display: 'grid' }],
	['inline-grid', { display: 'inline-grid' }],

	['block', { display: 'block' }],
	['inline-block', { display: 'inline-block' }],
	['inline', { display: 'inline' }],

	['none', { display: 'none' }],
];
