import type { Rule } from 'unocss';
import type { Theme } from '../theme';

const listRule: Rule<Theme> = [
	/^list-(.+)$/,
	([, type]) => ({ 'list-style': type }),
];

export const rules = [listRule];
