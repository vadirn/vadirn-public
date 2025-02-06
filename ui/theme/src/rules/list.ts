import type { Rule } from 'unocss';
import type { Theme } from '../theme';

export const listRule: Rule<Theme> = [
	/^list-(.+)$/,
	([, type]) => ({ 'list-style': type }),
];
